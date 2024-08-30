import { Hono } from "hono";
import { handle } from "hono/vercel";
import { videoRoute } from "@server/routes/video";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/", (c) => {
  return c.json({ msg: "home page" });
});

app.route("video", videoRoute);

export const GET = handle(app);
