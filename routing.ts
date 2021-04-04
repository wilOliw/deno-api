import { Router } from "https://deno.land/x/oak/mod.ts";

import createQR from "./handlers/createQR.ts";

const router = new Router();

router
  .get("/to-qr", createQR)

export default router;
