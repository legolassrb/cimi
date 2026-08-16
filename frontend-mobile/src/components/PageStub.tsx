/** Shared placeholder used by every not-yet-built page. */
export default function PageStub({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="px-4 py-8">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-neutral-500">{description ?? "Coming soon."}</p>
    </div>
  );
}
