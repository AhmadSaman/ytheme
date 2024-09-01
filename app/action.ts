"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { urlSchema } from "./schema";

export async function url(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: urlSchema,
  });
  console.log(submission);
  if (submission.status !== "success") {
    return submission.reply();
  }

  const { url } = Object.fromEntries(await formData);
  // @ts-ignore
  const newUrl = new URL(url);
  const searchParams = new URLSearchParams(newUrl.search);
  console.log();

  redirect(`/${searchParams.get("v")?.toString()}`);
}
