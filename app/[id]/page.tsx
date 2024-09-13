import Image from "next/image";
import { hc } from "hono/client";
import { AppType } from "../api/[...route]/route";
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
      <div className="flex flex-col xl:flex-row gap-4 p-4 text-slate-100 h-full">
        <main className="flex xl:h-full h-[50%]">
          <iframe
            className="flex-1  rounded-lg"
            src={`https://www.youtube.com/embed/${params.id}`}
            title="YouTube video player"
            // frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </main>
        <section className="2xl:w-[500px] h-full xl:w-[30%]  flex flex-col gap-6 w-full overflow-auto p-4 bg-zinc-900 rounded-md">
          {chapters?.map((chapter) => (
            <div className="flex gap-2 items-center">
              <Image
                src={chapter.thumbnails[0].url}
                alt="thumbnail"
                width={chapter.thumbnails[0].width}
                height={chapter.thumbnails[0].height}
                className="rounded-md"
              />
              <div className="text-sm">
                <p>{chapter.title}</p>
                <p>{chapter.time}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data.</div>;
  }
};

export default Page;
