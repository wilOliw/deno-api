import { getUsers } from "../services/users.ts";
import { RouteCtx } from "../models/fetch.ts";

export default async ({ response }: RouteCtx) => {
  response.body = await getUsers();
};
