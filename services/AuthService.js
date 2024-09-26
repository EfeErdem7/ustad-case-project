import ApiServiceBase from "~/services/ApiServiceBase";

export default class AuthServices extends ApiServiceBase {
  login(data) {
    return this.http({
      method: "post",
      url: "/login",
      data,
    });
  }

  register(data) {
    return this.http({
      method: "post",
      url: "/register",
      data,
    });
  }
}
