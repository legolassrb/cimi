/** Shared placeholder used by every not-yet-built page in the site map. */
export default function PageStub({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-neutral-500">{description ?? "Coming soon."}</p>
    </div>
  );
}
