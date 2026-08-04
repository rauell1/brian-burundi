import type { Metadata } from "next";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Download, Handshake, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { BrianPortrait } from "@/components/portrait";
import { ExperienceTimeline, MetricCard, OrganizationStrip, SectionHeading } from "@/components/public-sections";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { BreadcrumbStructuredData } from "@/components/structured-data";
import { careerQualities, expertisePillars, professionalSummary, publicContact } from "@/lib/content";
import { getPublishedCaseStudies, getPublishedExperiences, getPublishedImpactMetrics, getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [experiences, metrics, caseStudies, settings] = await Promise.all([
    getPublishedExperiences(),
    getPublishedImpactMetrics(),
    getPublishedCaseStudies(),
    getSiteSettings(),
  ]);

  return (
    <main>
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }]} />
      <section className="hero-gradient pb-20 pt-28 lg:pb-32 lg:pt-40">
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <MotionReveal>
            <div className="text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
                <Sparkles size={16} className="text-[#C9983C]" /> B2B Sales • Business Development • Partnerships
              </div>
              <h1 className="mt-8 max-w-4xl font-display text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-[4rem]">
                Building partnerships that turn market opportunities into <span className="text-gradient-gold">sustainable growth.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                Brian M. Burudi is a Nairobi-based B2B Sales Lead and business development professional with 5+ years of experience driving market development, strategic partnerships, customer acquisition, and revenue growth across electric mobility, healthcare, sustainability, technology, and connectivity.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ButtonLink href="/experience" className="rounded-full bg-[#C9983C] px-8 text-[#0B1F33] hover:bg-[#e0b665]">Explore My Experience <ArrowRight size={16} aria-hidden="true" /></ButtonLink>
                <ButtonLink href="/contact" variant="outline" className="rounded-full border-white/30 text-white hover:bg-white hover:text-[#0B1F33]">Let’s Connect</ButtonLink>
                <ButtonLink href={settings.cvUrl ?? publicContact.cvPath} variant="ghost" download className="rounded-full text-white/80 hover:text-white"><Download size={16} aria-hidden="true" /> Download CV</ButtonLink>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.12}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-[2.5rem] bg-white/10 p-2 backdrop-blur-xl">
                <BrianPortrait src={settings.portraitUrl} className="aspect-[4/5] rounded-[2rem] border-0" />
              </div>
              <div className="glass-panel absolute -bottom-8 left-4 right-4 rounded-2xl p-6 sm:left-auto sm:right-8 sm:w-80">
                <div className="space-y-4 text-sm font-semibold text-[#16202A]">
                  <p className="flex items-center gap-3"><MapPin className="size-5 shrink-0 text-[#C9983C]" aria-hidden="true" /> Nairobi, Kenya</p>
                  <p className="flex items-center gap-3"><BriefcaseBusiness className="size-5 shrink-0 text-[#C9983C]" aria-hidden="true" /> 5+ years of experience</p>
                  <p className="flex items-center gap-3"><Handshake className="size-5 shrink-0 text-[#C9983C]" aria-hidden="true" /> B2B sales and partnerships</p>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <OrganizationStrip />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <MotionReveal>
          <SectionHeading eyebrow="Professional summary" title="Commercial discipline with cross-sector market experience." />
          <div className="prose-executive mt-6 whitespace-pre-line text-lg">{professionalSummary}</div>
        </MotionReveal>
        <MotionReveal delay={0.1}>
          <Card className="p-6">
            <h3 className="text-xl font-bold text-[#0B1F33]">Career qualities</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {careerQualities.map((quality) => (
                <div key={quality} className="flex items-center gap-3 rounded-2xl border border-[#DDE3E9] bg-[#F7F8FA] p-4">
                  <CheckCircle2 className="size-5 shrink-0 text-[#16847A]" aria-hidden="true" />
                  <span className="font-semibold text-[#16202A]">{quality}</span>
                </div>
              ))}
            </div>
          </Card>
        </MotionReveal>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Impact snapshot"
            title="Verified career highlights, clearly attributed."
            description="The quantified operational results shown here relate specifically to Brian’s role at Surf Kenya / Express Wi‑Fi by Facebook and are not generalized across all positions."
            align="center"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Expertise" title="Commercial capabilities for growth-stage and institutional environments." description="Brian brings a practical mix of sales, partnerships, account management, and go-to-market execution capabilities." />
          <ButtonLink href="/expertise" variant="outline">View all expertise</ButtonLink>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {expertisePillars.slice(0, 6).map((pillar) => (
            <Card key={pillar.title} className="executive-shadow border-0 bg-white">
              <CardContent className="pt-6">
                <ShieldCheck className="size-9 text-[#16847A]" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-bold text-[#0B1F33]">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5D6875]">{pillar.explanation}</p>
                <a href={`/expertise#${pillar.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#174A7E] hover:text-[#0B1F33]">Explore pillar <ArrowRight size={15} aria-hidden="true" /></a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-[#F0F4F7] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Experience" title="A timeline of business development, sales, and partnership leadership." />
            <ButtonLink href="/experience" variant="outline">Full timeline</ButtonLink>
          </div>
          <div className="mt-12">
            <ExperienceTimeline experiences={experiences.slice(0, 4)} compact />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Selected impact stories" title="Evidence-led examples of commercial contribution." description="These examples avoid unverified claims and describe Brian’s contribution using confirmed CV information." align="center" />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <Card key={study.title} className="executive-shadow border-0 bg-white">
              <CardContent className="pt-6">
                <Badge>{study.organization}</Badge>
                <h3 className="mt-4 text-xl font-bold text-[#0B1F33]">{study.title}</h3>
                <div className="mt-5 space-y-4 text-sm leading-7 text-[#5D6875]">
                  <p><strong className="text-[#16202A]">Challenge:</strong> {study.challenge}</p>
                  <p><strong className="text-[#16202A]">Contribution:</strong> {study.contribution}</p>
                  <p><strong className="text-[#16202A]">Verified outcome:</strong> {study.outcome}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-[#0B1F33] py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#C9983C]">Let’s build</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Let’s build the next growth opportunity.</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">Brian is open to conversations about B2B sales leadership, strategic partnerships, market development, commercial growth, and customer acquisition opportunities.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <ButtonLink href="/contact" variant="gold">Let’s Connect</ButtonLink>
            <ButtonLink href={settings.cvUrl ?? publicContact.cvPath} variant="outline" download className="border-white/25 bg-transparent text-white hover:bg-white hover:text-[#0B1F33]">Download CV</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
