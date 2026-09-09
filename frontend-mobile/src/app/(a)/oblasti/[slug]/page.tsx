"use client";

import { useParams } from "next/navigation";
import { useDictionary } from "@/lib/i18n";
import { TreatmentDetail } from "@/components/farmadent/treatments";
import PageStub from "@/components/PageStub";

export default function OblastDetailPage() {
  const dict = useDictionary();
  const { slug } = useParams<{ slug: string }>();

  const treatment = dict.treatments.find((t) => t.slug === slug);

  if (!treatment) {
    return <PageStub title={dict.nav.oblasti} description="Oblast nije pronađena." />;
  }

  const others = dict.treatments.filter((t) => t.slug !== slug);

  return (
    <TreatmentDetail
      treatment={treatment}
      dict={dict}
      others={others}
      backTo="/oblasti"
      otherTo={(otherSlug) => `/oblasti/${otherSlug}`}
    />
  );
}
