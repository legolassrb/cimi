import Image from "next/image";
import Link from "next/link";
import { fetchHello } from "@/lib/api";
import { CalendarIcon, ShieldCheckIcon, HeartIcon, CONTENT_ICON_SIZE } from "@/components/icons";

// Quick-links into /services, using the real service icon set from
// public/icons/ (originals: frontend/photos/icons/).
const services = [
  { label: "Преглед", icon: "/icons/check-icon.png" },
  { label: "Ендодонција", icon: "/icons/canal-icon.png" },
  { label: "Импланти", icon: "/icons/screw-icon.png" },
  { label: "Ортодонција", icon: "/icons/braces-icon.png" },
  { label: "Вађење зуба", icon: "/icons/pull-icon.png" },
  { label: "Дигитални RTG", icon: "/icons/report-icon.png" },
];

export default async function HomePage() {
  let backendMessage: string;
  let backendReachable = true;

  try {
    const hello = await fetchHello();
    backendMessage = hello.message;
  } catch {
    backendReachable = false;
    backendMessage = "Backend unreachable — see README.md.";
  }

  return (
    <div>
      {/* Hero */}
      <section className="px-5 pt-6">
        <h1 className="text-3xl font-extrabold leading-tight text-navy">
          Ваш осмех,
          <br />
          наша <span className="text-brand">брига.</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-500">
          Савремена стоматологија са личним приступом и врхунском негом.
        </p>
        <Link
          href="/book"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-md active:bg-brand-dark"
        >
          <CalendarIcon className="h-5 w-5" />
          ЗАКАЖИТЕ ПРЕГЛЕД
        </Link>
      </section>

      {/* frontend/photos/lending.png */}
      <div className="animate-drop-in mt-4 flex justify-center px-10">
        <Image
          src="/landing-hero.png"
          alt="Преглед код стоматолога"
          width={1012}
          height={930}
          priority
          className="h-auto w-full max-w-xs"
        />
      </div>

      {/* Services quick links */}
      <section className="mt-6 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-navy">Наше услуге</h2>
          <Link href="/services" className="text-xs font-medium text-brand">
            Све услуге →
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-x-3 gap-y-4">
          {services.map((service) => (
            <Link
              key={service.label}
              href="/services"
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10">
                <Image
                  src={service.icon}
                  alt=""
                  width={64}
                  height={64}
                  className={`${CONTENT_ICON_SIZE} object-contain`}
                />
              </span>
              <span className="text-[11px] font-medium leading-tight text-navy">{service.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature row — ShieldCheck/Heart have no matching real icon (no
          asset represents "expertise" or "atmosphere"), so they stay as
          hand-drawn fallbacks sized to match the real instruments-icon.png
          used for "технологија", via the shared CONTENT_ICON_SIZE. */}
      <section className="mt-8 grid grid-cols-3 gap-3 px-5 text-center">
        <div className="flex flex-col items-center gap-2">
          <ShieldCheckIcon className={`${CONTENT_ICON_SIZE} text-brand`} />
          <div className="text-xs font-bold text-navy">СТРУЧНОСТ</div>
          <p className="text-[11px] leading-snug text-neutral-500">
            Искусни лекари и континуирано усавршавање
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/icons/instruments-icon.png"
            alt=""
            width={252}
            height={232}
            className={`${CONTENT_ICON_SIZE} object-contain`}
          />
          <div className="text-xs font-bold text-navy">САВРЕМЕНА ТЕХНОЛОГИЈА</div>
          <p className="text-[11px] leading-snug text-neutral-500">
            Најновија опрема за прецизну и безболну терапију
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <HeartIcon className={`${CONTENT_ICON_SIZE} text-brand`} />
          <div className="text-xs font-bold text-navy">ПРИЈАТНА АТМОСФЕРА</div>
          <p className="text-[11px] leading-snug text-neutral-500">
            Опуштена атмосфера за ваш комфор
          </p>
        </div>
      </section>

      {/* frontend/photos/lending2.png — "why patients trust us" */}
      <section className="mt-8 px-5">
        <div className="overflow-hidden rounded-3xl bg-brand/5">
          <Image
            src="/landing-care.png"
            alt="Наш тим стоматолога"
            width={1516}
            height={1026}
            className="w-full"
          />
          <div className="p-4">
            <p className="text-sm font-semibold text-navy">Бринемо о сваком детаљу</p>
            <p className="mt-1 text-xs text-neutral-500">
              Од прегледа до неге након терапије — тим који прати цео ваш пут.
            </p>
          </div>
        </div>
      </section>

      {/* CTA banner — frontend/photos/icons/smile.png */}
      <section className="mx-5 mt-8 flex items-center justify-between gap-4 rounded-3xl bg-brand px-5 py-6 text-white">
        <p className="text-lg font-bold leading-snug">
          Здрав осмех је најбоља одлука.
          <br />
          <span className="font-medium">Ту смо за вас!</span>
        </p>
        <span className="glow-brand flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/15">
          <Image src="/icons/smile.png" alt="" width={292} height={188} className="h-auto w-11" />
        </span>
      </section>

      {/* Dev-only pipeline check — not part of the design, just proves the
          frontend <-> backend wiring still works. Fine to delete once
          there's real page content that makes the point on its own. */}
      <div
        className={`mx-5 mb-6 mt-8 rounded-lg border p-3 text-xs ${
          backendReachable
            ? "border-green-300 bg-green-50 text-green-800"
            : "border-red-300 bg-red-50 text-red-800"
        }`}
      >
        <div className="font-medium">Backend says (dev check):</div>
        <div className="mt-1 font-mono">{backendMessage}</div>
      </div>
    </div>
  );
}
