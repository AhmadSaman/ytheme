"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ArrowRight } from "lucide-react";
import { url } from "./action";
import { useFormState } from "react-dom";
import { urlSchema } from "./schema";

export default function Home() {
  const [lastResult, action] = useFormState(url, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: urlSchema });
    },
    defaultValue: { url: "" },
    shouldValidate: "onInput",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="h-screen w-screen flex flex-col bg-zinc-800 gap-4">
      <div className="flex-1 justify-center content-center my-auto w-full gap-4 flex flex-col">
        <p className="text-slate-50 text-xl font-bold text-center">
          <span className="text-[#cc0000]">YT</span>heme
        </p>
        <form
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
          noValidate
          className="flex gap-3 mx-auto w-11/12 lg:flex-row flex-col lg:w-1/3"
        >
          <Input
            className="bg-slate-50 w-full"
            placeholder="paste youtube video link"
            key={fields.url.key}
            name={fields.url.name}
            defaultValue={fields.url.initialValue}
          />

          <Button
            className="active:scale-90 transition-all duration-200 bg-[#cc0000] hover:bg-[#cc0000]"
            onClick={() => {}}
            disabled={!!fields.url.errors?.length}
          >
            <ArrowRight className="size-full text-white" />
          </Button>
        </form>
        <div className="flex gap-3 text-sm text-slate-100 mx-auto w-11/12 lg:flex-row flex-col lg:w-1/3">
          <Toggle pressed size="sm">
            defualt
          </Toggle>
          <Toggle size="sm" disabled>
            udemy
          </Toggle>
          <Toggle size="sm" disabled>
            skilshare
          </Toggle>
        </div>
      </div>
      <div className="mx-auto text-slate-300 text-sm">
        <Button
          className="text-slate-100 hover:scale-105 transition-all duration-200"
          asChild
          variant={"link"}
        >
          <a href={"https://github.com/AhmadSaman/ytheme"}>
            <GitHubLogoIcon />
          </a>
        </Button>
        <span>|</span> <span>created by</span>
        <Button
          className="text-slate-100 transition-all duration-200"
          asChild
          variant={"link"}
        >
          <a href={"https://bento.me/ahmadsaman"}>weisi</a>
        </Button>
      </div>
    </div>
  );
}
