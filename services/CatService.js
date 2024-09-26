import ApiServiceBase from "~/services/ApiServiceBase";

export default class AuthServices extends ApiServiceBase {
  get(params) {
    return this.http({
      method: "get",
      url: "/images/search",
      params,
    });
  }
}
