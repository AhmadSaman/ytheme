import Image from "next/image";
import { hc } from "hono/client";
import { AppType } from "../api/[...route]/route";
import { formatTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import ChapterLink from "@/components/chapter-link";
import Iframe from "@/components/iframe";
interface PageProps {
  params: { id: string };
}
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const client = hc<AppType>(apiUrl!);

const Page = async ({ params }: PageProps) => {
  try {
    const res = await client.api.video[":id"].$get({
      param: { id: params.id },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const {
      data: { chapters },
    } = await res.json();
    return (
      <div className="flex flex-col xl:flex-row gap-4 p-4 text-slate-100 h-dvh">
        <main className="flex xl:flex-1 xl:h-full h-[50%]">
          <Iframe id={params.id} />
        </main>
        <section className="2xl:w-[500px] h-full xl:w-[30%]  flex flex-col gap-6 w-full overflow-auto p-4 bg-zinc-900 rounded-md">
          {chapters?.map((chapter, index) => {
            const searchParams = new URLSearchParams();
            searchParams.set("from", chapter.time.toString());
            if (index + 1 !== chapters.length)
              searchParams.set("to", chapters[index + 1].time.toString());

            return (
              <ChapterLink searchParams={searchParams}>
                <Image
                  src={chapter.thumbnails[0].url}
                  alt="thumbnail"
                  width={chapter.thumbnails[0].width}
                  height={chapter.thumbnails[0].height}
                  className="rounded-md object-contain w-[100px] lg:w-auto"
                />
                <div className="text-sm">
                  <p>{chapter.title}</p>
                  <Badge variant={"default"} className="px-1">
                    {formatTime(chapter.time)}
                  </Badge>
                </div>
              </ChapterLink>
            );
          })}
        </section>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data.</div>;
  }
};

export default Page;
