import { z } from "zod";

export const urlSchema = z.object({
  url: z
    .string()
    .url()
    .refine(
      (url) => {
        const youtubeRegex =
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        return youtubeRegex.test(url);
      },
      {
        message: "Invalid YouTube URL. The URL must be from YouTube.",
      }
    ),
});
