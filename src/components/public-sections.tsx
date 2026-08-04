"use client";

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
    <section className="text-[#111]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#555]">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#555]">{description}</p>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#555]">{eyebrow}</p> : null}
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tighter text-[#111] sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-[#555] sm:text-lg">{description}</p> : null}
    </div>
  );
}

export function OrganizationStrip() {
  const marqueeItems = [...organizationNames, ...organizationNames];

  return (
    <section className="border-y border-black/5 overflow-hidden">
      <div className="py-8">
        <p className="mb-6 px-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#555]">
          Experience across respected organizations and growth-stage companies
        </p>
        <div className="relative flex w-full mask-edges">
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
                className="flex h-16 min-w-[200px] shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-black/5 px-6 text-center text-sm font-bold text-[#111]"
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
    <div className="bento-card h-full p-6 text-center">
      <p className="font-display text-5xl font-extrabold text-[#111]">
        {metric.prefix}{metric.value}{metric.suffix}
      </p>
      <h3 className="mt-3 text-base font-bold text-[#111]">{metric.label}</h3>
      <p className="mt-2 text-sm leading-6 text-[#555]">{metric.context}</p>
    </div>
  );
}

export function ExperienceTimeline({ experiences, compact = false }: { experiences: ExperienceContent[]; compact?: boolean }) {
  return (
    <div className="relative space-y-6 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-black/10 md:before:left-1/2">
      {experiences.map((experience, index) => (
        <article key={`${experience.organization}-${experience.jobTitle}-${experience.startDate}`} className="relative grid gap-6 md:grid-cols-2 md:gap-10">
          <div className={index % 2 === 0 ? "md:text-right" : "md:col-start-2"}>
            <div className="ml-10 md:ml-0">
              <div className="inline-block rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-medium text-[#111]">{experience.sector}</div>
              <h3 className="mt-4 text-2xl font-display font-bold text-[#111]">{experience.jobTitle}</h3>
              <p className="mt-1 text-lg font-semibold text-[#555]">{experience.organization}</p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm text-[#555] md:justify-end"><MapPin size={16} aria-hidden="true" /> {experience.location}</p>
              <p className="mt-1 text-sm font-semibold text-black/50">{formatDateRange(experience.startDate, experience.endDate, experience.isCurrent)}</p>
            </div>
          </div>
          <div className={index % 2 === 0 ? "md:col-start-2" : "md:row-start-1"}>
            <span className="absolute left-2 top-1.5 grid size-5 place-items-center rounded-full bg-black ring-8 ring-[#fafafa] md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
            <div className="bento-card ml-10 md:ml-0 p-6">
              <p className="text-sm leading-7 text-[#555]">{experience.summary}</p>
              {!compact ? (
                <ul className="mt-5 space-y-2 text-sm leading-6 text-[#555]">
                  {experience.responsibilities.map((item) => (
                    <li key={item} className="flex gap-2"><span className="mt-2 size-1.5 rounded-full bg-black/50 shrink-0" aria-hidden="true" /> <span>{item}</span></li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-5 flex flex-wrap gap-2">
                {experience.skills.map((skill) => <span key={skill} className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-[#111]">{skill}</span>)}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="inline-flex items-center gap-2 font-bold text-[#174A7E] hover:text-[#0B1F33]">{children}<ArrowRight size={16} aria-hidden="true" /></Link>;
}
