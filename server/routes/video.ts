import * as cheerio from "cheerio";

import { getChaptersFromJson } from "../lib/video";

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type Chapter = {
  title: string;
  time: number;
  thumbnails: Thumbnail[];
};

export const videoRoute = new Hono().get(
  "/:id",
  zValidator("param", z.object({ id: z.string() })),
  async (c) => {
    const { id } = c.req.valid("param");
    const url = `https://www.youtube.com/watch?v=${id}`;
    try {
      const res = await fetch(url);
      const html = await res.text();
      const $ = cheerio.load(html);
      const scriptTag = $('script:contains("ytInitialData")').html();
      if (!scriptTag) {
        throw new Error("ytInitialData script tag not found");
      }

      const jsonMatch = scriptTag.match(/var ytInitialData = ({.*});/);

      if (!jsonMatch) {
        throw new Error("ytInitialData not found in the script tag");
      }

      const json = JSON.parse(jsonMatch[1]);

      const chapters = getChaptersFromJson(json);

      return c.json({
        data: {
          chapters: chapters,
        },
      });
    } catch (error) {
      return c.json({ msg: `something went wrong`, error });
    }
  }
);
