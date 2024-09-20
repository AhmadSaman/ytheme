"use client";

import { useSearchParams } from "next/navigation";

function Iframe({ id }: { id: string }) {
  const urlQueryParams = useSearchParams();
  return (
    <iframe
      className="flex-1 rounded-lg"
      src={`https://www.youtube.com/embed/${id}?start=${urlQueryParams.get(
        "from"
      )}&end=${urlQueryParams.get("to")}`}
      title="YouTube video player"
      // frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
}

export default Iframe;
