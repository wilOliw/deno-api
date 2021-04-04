import { helpers } from "https://deno.land/x/oak/mod.ts";
import { generate } from "../services/qr-code.ts";
import { RouteCtx } from "../models/fetch.ts";

export default async (
  ctx: any,
  next: any,
) => {
  const { text } = helpers.getQuery(ctx, { mergeParams: true });
  const { response, params, query } = ctx;
  if (typeof text !== "string") {
    response.body = {
      msg: "Content for qr-code must be a string",
    };
    return;
  }
  if (!text?.trim()) {
    response.body = {
      msg: "Text field is required",
    };
    return;
  }
  const base64 = await generate(text);
  response.body = {
    msg: "QR-code created",
    base64,
  };
};
