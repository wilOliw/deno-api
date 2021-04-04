import { qrcode } from "https://deno.land/x/qrcode/mod.ts";
export const generate = async (value: string) => await qrcode(value);
