import Image from "next/image";
import { Dancing_Script } from "next/font/google";
import { fetchHello } from "@/lib/api";

const cursive = Dancing_Script({ subsets: ["latin"], weight: "700" });

export default async function HomePage() {
  let backendMessage: string;
  let backendReachable = true;

  try {
    const hello = await fetchHello();
    backendMessage = hello.message;
  } catch {
    backendReachable = false;
    backendMessage = "Could not reach the backend — is it running? See README.md.";
  }

  return (
    <div className="px-4 py-6">
      <div className="animate-drop-in flex flex-col items-center text-center">
        <Image
          src="/cimika.png"
          alt="Cimika"
          width={770}
          height={774}
          priority
          className="h-32 w-32 rounded-full object-cover shadow-lg"
        />
        <p className={`${cursive.className} mt-3 text-3xl`}>deste bre ljudi</p>
      </div>

      <h1 className="mt-8 text-center text-xl font-semibold">Welcome</h1>
      <p className="mt-1 text-center text-sm text-neutral-500">
        Mobile home placeholder — intro + book-now CTA will go here.
      </p>

      <div
        className={`mt-6 rounded-lg border p-3 text-sm ${
          backendReachable
            ? "border-green-300 bg-green-50 text-green-800"
            : "border-red-300 bg-red-50 text-red-800"
        }`}
      >
        <div className="font-medium">Backend says:</div>
        <div className="mt-1 font-mono text-xs">{backendMessage}</div>
      </div>
    </div>
  );
}
