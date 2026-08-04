import type { Metadata } from "next";
import { BookOpen, GraduationCap, Languages, Leaf, Target, UsersRound } from "lucide-react";
import { PageIntro, SectionHeading } from "@/components/public-sections";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbStructuredData } from "@/components/structured-data";
import { defaultCertifications, education, languages, sectors } from "@/lib/content";
import { getPublishedCertifications } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Brian M. Burudi’s professional biography, working style, values, education, certifications, languages, and cross-sector business development experience.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Professional philosophy",
    icon: Target,
    text: "Brian believes effective business development starts with understanding customer realities, identifying commercially sensible opportunities, and building trust before asking for commitment.",
  },
  {
    title: "Approach to partnerships",
    icon: UsersRound,
    text: "He maps stakeholders, clarifies mutual value, develops practical proposals, and keeps momentum through consistent follow-up, CRM discipline, and transparent communication.",
  },
  {
    title: "Leadership and collaboration",
    icon: BookOpen,
    text: "Brian is comfortable working across sales, operations, marketing, product, compliance, and customer-success teams to turn market insight into coordinated execution.",
  },
  {
    title: "Sustainability and ESG interest",
    icon: Leaf,
    text: "His work across electric mobility, conservation, water, and ESG-oriented services reflects an interest in responsible business models that can create commercial and social value.",
  },
];

export default async function AboutPage() {
  const certifications = await getPublishedCertifications();

  return (
    <main>
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <PageIntro
        eyebrow="About Brian"
        title="A relationship-led commercial professional shaped by Kenya’s growth markets."
        description="Brian combines B2B sales discipline, partnership development, market execution, and sustainability awareness across commercial, institutional, and mission-driven environments."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
        <div>
          <SectionHeading eyebrow="Biography" title="Building relationships that create measurable commercial and social value." />
          <div className="prose-executive mt-6 text-lg">
            <p>Brian M. Burudi is a Nairobi-based business development and B2B sales professional whose career has been shaped by one central strength: building relationships that create measurable commercial and social value.</p>
            <p>His experience cuts across electric mobility, healthcare, sustainability, franchising, conservation, connectivity, and technology. This cross-sector background allows him to understand different customer environments, engage decision-makers, develop practical commercial proposals, and guide opportunities from prospecting through negotiation, onboarding, and account development.</p>
            <p>Brian combines commercial discipline with an interest in sustainability and responsible business. He is comfortable working in fast-moving growth companies, established institutions, social enterprises, and mission-driven organizations.</p>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold text-[#0B1F33]">Sector breadth</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {sectors.map((sector) => <Badge key={sector.title}>{sector.title}</Badge>)}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Working style" title="Practical, commercially grounded, and partnership oriented." align="center" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title}>
                  <CardContent className="pt-6">
                    <Icon className="size-9 text-[#16847A]" aria-hidden="true" />
                    <h3 className="mt-4 text-xl font-bold text-[#0B1F33]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#5D6875]">{item.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <GraduationCap className="size-9 text-[#C9983C]" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-[#0B1F33]">Education</h2>
            <div className="mt-6 space-y-5">
              {education.map((item) => (
                <div key={item.qualification} className="border-l-2 border-[#C9983C] pl-4">
                  <h3 className="font-bold text-[#16202A]">{item.qualification}</h3>
                  <p className="mt-1 text-sm text-[#174A7E]">{item.institution}</p>
                  <p className="mt-1 text-sm text-[#5D6875]">{item.details}</p>
                  <p className="mt-1 text-sm font-semibold text-[#16202A]">{item.dates}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-[#0B1F33]">Certifications</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {(certifications.length ? certifications : defaultCertifications).map((certification) => (
                <div key={`${certification.title}-${certification.issuer}`} className="rounded-2xl border border-[#DDE3E9] bg-[#F7F8FA] p-5">
                  <h3 className="font-bold text-[#16202A]">{certification.title}</h3>
                  <p className="mt-2 text-sm text-[#174A7E]">{certification.issuer}</p>
                  <p className="mt-2 text-sm text-[#5D6875]">{certification.issueDate}{certification.expiryDate ? ` – ${certification.expiryDate}` : ""}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardContent className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Languages className="size-9 text-[#16847A]" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-bold text-[#0B1F33]">Languages</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {languages.map((item) => <Badge key={item.language}>{item.language} — {item.level}</Badge>)}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
