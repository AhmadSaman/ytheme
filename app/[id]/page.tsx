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
    const json = await res.json();
    return (
      <div className="lg:flex text-slate-100 h-full">
        <main className="flex-1 flex lg:h-full h-[300px]">
          <iframe
            className="w-full flex-1 rounded-lg overflow-hidden m-4 box-border"
            src={`https://www.youtube.com/embed/${params.id}`}
            title="YouTube video player"
            // frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </main>
        <section className="lg:w-[20%] md:w-[200px] w-full m-4">
          {/* <pre> {JSON.stringify(json, null, 2)}</pre> */}
        </section>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data.</div>;
  }
};

export default Page;
