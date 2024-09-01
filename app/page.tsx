import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <p className="text-purple-600 text-2xl">youtube chapters</p>
      <Button asChild>
        <Link href={"jXyTIQOfTTk"}>text link</Link>
      </Button>
    </div>
  );
}
