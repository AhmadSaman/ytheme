"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

function ChapterLink({
  children,
  searchParams,
}: {
  children: ReactNode;
  searchParams: URLSearchParams;
}) {
  const sp = new URLSearchParams(searchParams);
  const urlQueryParams = useSearchParams();
  return (
    <Link
      href={`?${sp.toString()}`}
      className={cn("flex gap-2 items-center transition-all duration-150", {
        "bg-slate-100/10 rounded-md py-1 scale-105":
          urlQueryParams.get("from") === sp.get("from"),
      })}
    >
      {children}
    </Link>
  );
}

export default ChapterLink;
