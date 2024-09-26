export default class ApiServiceBase {
  constructor(http) {
    this._http = http;
  }

  get http() {
    return this._http;
  }
}
