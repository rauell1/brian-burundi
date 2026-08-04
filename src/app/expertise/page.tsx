import type { Metadata } from "next";
import { BriefcaseBusiness, Handshake, LineChart, Network, Target, UsersRound } from "lucide-react";
import { PageIntro, SectionHeading } from "@/components/public-sections";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbStructuredData } from "@/components/structured-data";
import { expertisePillars, sectors } from "@/lib/content";

export const metadata: Metadata = {
  title: "Expertise",
  description: "Brian M. Burudi’s expertise across B2B sales strategy, business development, strategic partnerships, key account management, go-to-market execution, and network development.",
  alternates: { canonical: "/expertise" },
};

const iconMap = {
  "line-chart": LineChart,
  "briefcase-business": BriefcaseBusiness,
  handshake: Handshake,
  "users-round": UsersRound,
  target: Target,
  network: Network,
};

export default function ExpertisePage() {
  return (
    <main>
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Expertise", path: "/expertise" }]} />
      <PageIntro
        eyebrow="Expertise"
        title="Commercial pillars for B2B growth, partnerships, and market expansion."
        description="Brian’s strengths sit at the intersection of sales strategy, practical business development, stakeholder trust, customer lifecycle management, and field execution."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Service pillars" title="Six areas where Brian can help organizations move opportunities forward." />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {expertisePillars.map((pillar) => {
            const Icon = iconMap[pillar.icon as keyof typeof iconMap] ?? Target;
            return (
              <Card key={pillar.title} id={pillar.slug} className="scroll-mt-28">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#16847A]/10 text-[#16847A]">
                      <Icon aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#0B1F33]">{pillar.title}</h2>
                      <p className="mt-3 text-sm leading-7 text-[#5D6875]">{pillar.explanation}</p>
                      <div className="mt-5">
                        <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#C9983C]">Related skills</h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {pillar.skills.map((skill) => <Badge key={skill}>{skill}</Badge>)}
                        </div>
                      </div>
                      <div className="mt-5">
                        <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#C9983C]">Relevant organizations</h3>
                        <p className="mt-2 text-sm leading-7 text-[#5D6875]">{pillar.organizations.join(" • ")}</p>
                      </div>
                      <a href="/experience" className="mt-5 inline-flex font-bold text-[#174A7E] hover:text-[#0B1F33]">View corresponding experience</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Sector experience" title="Transferable skills across growth markets and mission-led sectors." description="Sector descriptions are intentionally careful: they explain how Brian’s commercial skills apply without fabricating unverified organization-specific results." align="center" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector) => (
              <Card key={sector.title}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold text-[#0B1F33]">{sector.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5D6875]">{sector.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
