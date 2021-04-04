import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { APP_HOST, APP_PORT, BUILD_MODE } from "./config.ts";
import router from "./routing.ts";
import notFound from "./handlers/notFound.ts";
import errorMiddleware from "./middlewares/error.ts";

const app = new Application();
app.use(
  oakCors({
    origin: "http://127.0.0.1:5500",
  }),
);

app.use(errorMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFound);

console.log(
  `Listening on http://${APP_HOST}:${APP_PORT} in ${BUILD_MODE} mode.`,
);

await app.listen(`${APP_HOST}:${APP_PORT}`);
