import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-between p-12">
      <div className="btn gap-4 p-3 items-center h-auto hover:bg-black">
        <Image width={32} height={32} src="/favicon.ico" alt="vercel logo" />
        <p className="text-xl font-bold font-mono text-gray-200">
          Hello world!
        </p>
      </div>
    </main>
  );
}
