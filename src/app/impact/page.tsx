import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { MetricCard, PageIntro, SectionHeading } from "@/components/public-sections";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbStructuredData } from "@/components/structured-data";
import { getPublishedCaseStudies, getPublishedImpactMetrics } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Impact",
  description: "Verified impact metrics and selected career stories from Brian M. Burudi’s business development and sales experience.",
  alternates: { canonical: "/impact" },
};

export default async function ImpactPage() {
  const [metrics, caseStudies] = await Promise.all([getPublishedImpactMetrics(), getPublishedCaseStudies()]);

  return (
    <main>
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Impact", path: "/impact" }]} />
      <PageIntro
        eyebrow="Selected impact"
        title="Measured results and credible contribution stories."
        description="Brian’s portfolio highlights verified achievements while avoiding invented metrics, fake testimonials, or unsupported claims."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#C9983C]/40 bg-[#fffaf0] p-6 sm:p-8">
          <div className="flex gap-4">
            <ShieldCheck className="mt-1 size-6 shrink-0 text-[#C9983C]" aria-hidden="true" />
            <div>
              <h2 className="text-xl font-bold text-[#0B1F33]">Verification principle</h2>
              <p className="mt-2 text-sm leading-7 text-[#5D6875]">The quantified results in this section relate specifically to Brian’s Regional Field Sales Associate role at Surf Kenya / Express Wi‑Fi by Facebook, unless otherwise stated. They do not imply the same numbers across all positions.</p>
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Selected impact stories" title="Three examples of commercial and partnership contribution." align="center" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Card key={study.title}>
                <CardContent className="pt-6">
                  <Badge>{study.organization}</Badge>
                  <h2 className="mt-4 text-2xl font-bold text-[#0B1F33]">{study.title}</h2>
                  <dl className="mt-6 space-y-5 text-sm leading-7">
                    <div>
                      <dt className="font-bold text-[#16202A]">Challenge</dt>
                      <dd className="mt-1 text-[#5D6875]">{study.challenge}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-[#16202A]">Contribution</dt>
                      <dd className="mt-1 text-[#5D6875]">{study.contribution}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-[#16202A]">Verified outcome</dt>
                      <dd className="mt-1 text-[#5D6875]">{study.outcome}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
