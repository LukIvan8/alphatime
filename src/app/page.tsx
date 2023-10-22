import { sb } from "@/service/config";
import Image from "next/image";

export default async function Home() {
  const { data, error } = await sb.from("classes").select("*");

  return (
    <main className="flex min-h-[100dvh] flex-col items-center gap-12 p-12">
      <div className="flex flex-col gap-2 items-start w-2/3 mx-auto">
        {data && data.map((clss, id) => <div key={id}>{clss.subject}</div>)}
      </div>
    </main>
  );
}
