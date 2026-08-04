import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { organizationNames } from "@/lib/content";
import { formatDateRange } from "@/lib/utils";
import type { ExperienceContent, ImpactMetricContent } from "@/lib/content";
import { motion } from "framer-motion";

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="bg-[#0B1F33] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#C9983C]">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{description}</p>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#C9983C]">{eyebrow}</p> : null}
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0B1F33] sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-[#5D6875] sm:text-lg">{description}</p> : null}
    </div>
  );
}

export function OrganizationStrip() {
  const marqueeItems = [...organizationNames, ...organizationNames];

  return (
    <section className="border-y border-[#DDE3E9] bg-white overflow-hidden">
      <div className="py-8">
        <p className="mb-6 px-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#5D6875]">
          Experience across respected organizations and growth-stage companies
        </p>
        <div className="relative flex w-full">
          <motion.div
            className="flex gap-4 px-2"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {marqueeItems.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex h-16 min-w-[200px] shrink-0 items-center justify-center rounded-2xl border border-[#DDE3E9] bg-[#F7F8FA] px-6 text-center text-sm font-bold text-[#0B1F33]"
              >
                {name}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function MetricCard({ metric }: { metric: ImpactMetricContent }) {
  return (
    <Card className="executive-shadow h-full border-0 bg-white p-6">
      <p className="font-display text-4xl font-bold text-[#0B1F33]">
        {metric.prefix}{metric.value}{metric.suffix}
      </p>
      <h3 className="mt-3 text-base font-bold text-[#16202A]">{metric.label}</h3>
      <p className="mt-2 text-sm leading-6 text-[#5D6875]">{metric.context}</p>
    </Card>
  );
}

export function ExperienceTimeline({ experiences, compact = false }: { experiences: ExperienceContent[]; compact?: boolean }) {
  return (
    <div className="relative space-y-6 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-[#DDE3E9] md:before:left-1/2">
      {experiences.map((experience, index) => (
        <article key={`${experience.organization}-${experience.jobTitle}-${experience.startDate}`} className="relative grid gap-6 md:grid-cols-2 md:gap-10">
          <div className={index % 2 === 0 ? "md:text-right" : "md:col-start-2"}>
            <div className="ml-10 md:ml-0">
              <Badge>{experience.sector}</Badge>
              <h3 className="mt-3 text-2xl font-bold text-[#0B1F33]">{experience.jobTitle}</h3>
              <p className="mt-1 text-lg font-semibold text-[#174A7E]">{experience.organization}</p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm text-[#5D6875] md:justify-end"><MapPin size={16} aria-hidden="true" /> {experience.location}</p>
              <p className="mt-1 text-sm font-semibold text-[#16202A]">{formatDateRange(experience.startDate, experience.endDate, experience.isCurrent)}</p>
            </div>
          </div>
          <div className={index % 2 === 0 ? "md:col-start-2" : "md:row-start-1"}>
            <span className="absolute left-2 top-1.5 grid size-5 place-items-center rounded-full bg-[#C9983C] ring-8 ring-[#F7F8FA] md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
            <Card className="executive-shadow ml-10 border-0 bg-white md:ml-0">
              <CardContent className="pt-6">
                <p className="text-sm leading-7 text-[#5D6875]">{experience.summary}</p>
                {!compact ? (
                  <ul className="mt-5 space-y-2 text-sm leading-6 text-[#5D6875]">
                    {experience.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 size-4 shrink-0 text-[#16847A]" aria-hidden="true" /> <span>{item}</span></li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-5 flex flex-wrap gap-2">
                  {experience.skills.map((skill) => <span key={skill} className="rounded-full bg-[#EEF3F7] px-3 py-1 text-xs font-semibold text-[#174A7E]">{skill}</span>)}
                </div>
              </CardContent>
            </Card>
          </div>
        </article>
      ))}
    </div>
  );
}

export function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="inline-flex items-center gap-2 font-bold text-[#174A7E] hover:text-[#0B1F33]">{children}<ArrowRight size={16} aria-hidden="true" /></Link>;
}
