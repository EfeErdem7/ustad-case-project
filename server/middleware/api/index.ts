import {
  defineEventHandler,
  proxyRequest,
  getQuery,
  getRequestHeaders,
  readRawBody,
} from "h3";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async (event) => {
  const url = event.node.req.url || "";
  if (!url.startsWith("/api/")) {
    return;
  }

  const config = useRuntimeConfig();
  const apiKey = config.catApiKey;
  const apiUrl = config.apiBaseUrl;

  const apiPath = url.replace(/^\/api/, "");

  const query = getQuery(event);

  const queryString = new URLSearchParams(
    query as Record<string, string>
  ).toString();
  const targetUrl = `${apiUrl}${apiPath}?${queryString}`;

  const headers: Record<string, string> = {
    ...getRequestHeaders(event),
    "x-api-key": apiKey,
  };

  const fetchOptions: RequestInit = {
    method: event.node.req.method || "GET",
    headers,
  };

  if (fetchOptions.method !== "GET" && fetchOptions.method !== "HEAD") {
    const rawBody = await readRawBody(event);
    fetchOptions.body = rawBody as BodyInit;
  }

  return await proxyRequest(event, targetUrl, {
    fetchOptions,
  });
});
