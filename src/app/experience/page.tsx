import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import { ExperienceTimeline, PageIntro } from "@/components/public-sections";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbStructuredData } from "@/components/structured-data";
import { pendingOrganizationNote } from "@/lib/content";
import { getPublishedExperiences } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Experience",
  description: "Explore Brian M. Burudi’s professional timeline across electric mobility, sustainability, franchising, healthcare, conservation, and connectivity.",
  alternates: { canonical: "/experience" },
};

export default async function ExperiencePage() {
  const experiences = await getPublishedExperiences();

  return (
    <main>
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Experience", path: "/experience" }]} />
      <PageIntro
        eyebrow="Professional experience"
        title="A cross-sector timeline of business development, sales, and partnership execution."
        description="Each role below uses verified CV information and presents responsibilities, sector context, and skill tags without fabricating unverified achievements."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ExperienceTimeline experiences={experiences} />
        <Card className="mt-12 border-[#C9983C]/40 bg-[#fffaf0]">
          <CardContent className="flex gap-3 pt-6">
            <AlertCircle className="mt-1 size-5 shrink-0 text-[#C9983C]" aria-hidden="true" />
            <div>
              <h2 className="font-bold text-[#0B1F33]">Content verification note</h2>
              <p className="mt-2 text-sm leading-6 text-[#5D6875]">{pendingOrganizationNote} They are included in the organization wall and as unpublished database placeholders only.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
