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
      <section className="hero-gradient pb-20 pt-32 lg:pb-32 lg:pt-48">
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <MotionReveal>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#888] backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" /> B2B Sales & Market Expansion
              </div>
              <h1 className="mt-8 max-w-4xl font-display text-5xl font-extrabold leading-[1.1] tracking-tighter sm:text-6xl lg:text-[4.5rem]">
                Accelerating <span className="text-gradient-neon text-transparent">commercial growth</span> in emerging markets.
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-[#888]">
                Brian M. Burudi is a Nairobi-based B2B Sales Lead and business development professional with 5+ years of experience driving market development, strategic partnerships, customer acquisition, and revenue growth across electric mobility, healthcare, sustainability, technology, and connectivity.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ButtonLink href="/experience" variant="primary">Explore My Experience</ButtonLink>
                <ButtonLink href="/contact" variant="outline">Let’s Connect</ButtonLink>
                <ButtonLink href={settings.cvUrl ?? publicContact.cvPath} variant="ghost" download><Download size={16} aria-hidden="true" /> Download CV</ButtonLink>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.12}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-[2.5rem] bg-white/5 p-2 backdrop-blur-xl border border-white/10">
                <BrianPortrait src={settings.portraitUrl} className="aspect-[4/5] rounded-[2rem] border-0 mix-blend-luminosity opacity-80 transition hover:mix-blend-normal hover:opacity-100" />
              </div>
              <div className="glass-panel absolute -bottom-8 left-4 right-4 rounded-2xl p-6 sm:left-auto sm:right-8 sm:w-80 border-t border-l border-white/20">
                <div className="space-y-4 text-sm font-medium text-[#ededed]">
                  <p className="flex items-center gap-3"><MapPin className="size-5 shrink-0 text-[#888]" aria-hidden="true" /> Nairobi, Kenya</p>
                  <p className="flex items-center gap-3"><BriefcaseBusiness className="size-5 shrink-0 text-[#888]" aria-hidden="true" /> 5+ years of experience</p>
                  <p className="flex items-center gap-3"><Handshake className="size-5 shrink-0 text-[#888]" aria-hidden="true" /> B2B sales and partnerships</p>
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
          <div className="bento-card p-8 h-full">
            <h3 className="text-xl font-display font-bold text-[#ededed]">Career qualities</h3>
            <div className="mt-6 flex flex-col gap-4">
              {careerQualities.map((quality) => (
                <div key={quality} className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition hover:bg-white/10">
                  <span className="font-medium text-[#888]">{quality}</span>
                </div>
              ))}
            </div>
          </div>
        </MotionReveal>
      </section>

      <section className="py-20">
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
            <div key={pillar.title} className="bento-card flex flex-col justify-between p-8">
              <div>
                <ShieldCheck className="size-8 text-[#fff]" aria-hidden="true" />
                <h3 className="mt-6 text-xl font-display font-bold text-[#ededed]">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#888]">{pillar.explanation}</p>
              </div>
              <a href={`/expertise#${pillar.slug}`} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#fff] opacity-50 hover:opacity-100 transition">Explore pillar <ArrowRight size={15} aria-hidden="true" /></a>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 border-y border-white/5 bg-[#050505]">
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
            <div key={study.title} className="bento-card p-8">
              <div className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#fff]">{study.organization}</div>
              <h3 className="mt-6 text-xl font-display font-bold text-[#ededed]">{study.title}</h3>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#888]">
                <p><strong className="text-white">Challenge:</strong> {study.challenge}</p>
                <p><strong className="text-white">Contribution:</strong> {study.contribution}</p>
                <p><strong className="text-white">Outcome:</strong> {study.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 border-t border-white/5">
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
