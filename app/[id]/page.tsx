interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  try {
    const res = await fetch(`http://localhost:3000/api/video/${params.id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const json = await res.json();
    console.log(json);

    return (
      <div>
        <h1>Video ID: {params.id}</h1>
        <pre>{JSON.stringify(json, null, 2)}</pre>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data.</div>;
  }
};

export default Page;
