"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { urlSchema } from "./schema";

export async function url(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: urlSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { url } = Object.fromEntries(await formData);

  const newUrl = new URL(url.toString());

  if (newUrl.href.includes("youtu.be")) {
    const parts = newUrl.pathname.split("/");
    const id = parts[parts.length - 1];
    return redirect(`/${id}`);
  }
  const searchParams = new URLSearchParams(newUrl.search);
  redirect(`/${searchParams.get("v")?.toString()}`);
}
