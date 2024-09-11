import { Hono } from "hono";
import { handle } from "hono/vercel";
import { videoRoute } from "@server/routes/video";

// I tried to use edge for my apis but apparently some of the node apis is not provided by vercel's edge functions
// export const runtime = "edge";

const app = new Hono().basePath("/api").route("/video", videoRoute);

export type AppType = typeof app;
export const GET = handle(app);
