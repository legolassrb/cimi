import { fetchHello } from "@/lib/api";

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
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Dentist Office</h1>
      <p className="mt-2 text-neutral-500">
        Home page placeholder — intro, highlights, and a call-to-action to book will go here.
      </p>

      <div
        className={`mt-8 rounded-lg border p-4 text-sm ${
          backendReachable
            ? "border-green-300 bg-green-50 text-green-800"
            : "border-red-300 bg-red-50 text-red-800"
        }`}
      >
        <div className="font-medium">Backend says:</div>
        <div className="mt-1 font-mono">{backendMessage}</div>
      </div>
    </div>
  );
}
