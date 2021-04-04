import { RouteCtx } from "../models/fetch.ts";
export default ({ response }: RouteCtx) => {
  response.status = 404;
  response.body = { msg: "Not Found" };
};
