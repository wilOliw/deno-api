import { config } from "https://deno.land/x/dotenv/mod.ts";
export const APP_HOST = config().HOST || "localhost";
export const APP_PORT = config().PORT || 3000;
export const BUILD_MODE = config().MODE || "development";
export const IS_PRODUCTION = BUILD_MODE === "production";
export const IS_DEV = !IS_PRODUCTION;
