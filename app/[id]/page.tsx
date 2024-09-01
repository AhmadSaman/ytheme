async function page({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/video/${params.id}`);
  const json = await res.json();
  return <div>{JSON.stringify(json)}</div>;
}

export default page;
