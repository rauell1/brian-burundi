import type { Metadata } from "next";
import { Download, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/public-sections";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbStructuredData } from "@/components/structured-data";
import { publicContact } from "@/lib/content";
import { getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Brian M. Burudi for B2B sales leadership, strategic partnerships, market development, consulting, speaking, and commercial growth opportunities.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const email = settings.publicEmail ?? publicContact.email;
  const phone = settings.publicPhone ?? publicContact.phone;
  const linkedIn = settings.linkedInUrl ?? publicContact.linkedIn;
  const location = settings.location ?? publicContact.location;
  const cvUrl = settings.cvUrl ?? publicContact.cvPath;

  return (
    <main>
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <PageIntro
        eyebrow="Contact"
        title="Let’s build the next growth opportunity."
        description="Brian is open to conversations about B2B sales leadership, strategic partnerships, market development, commercial growth, and customer acquisition opportunities."
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-5 pt-6">
              <h2 className="text-2xl font-bold text-[#0B1F33]">Professional contact information</h2>
              <a className="flex items-center gap-3 text-[#5D6875] hover:text-[#0B1F33]" href={`mailto:${email}`}><Mail className="size-5 text-[#C9983C]" aria-hidden="true" /> {email}</a>
              <a className="flex items-center gap-3 text-[#5D6875] hover:text-[#0B1F33]" href={`tel:${phone.replace(/\s+/g, "")}`}><Phone className="size-5 text-[#C9983C]" aria-hidden="true" /> {phone}</a>
              <a className="flex items-center gap-3 text-[#5D6875] hover:text-[#0B1F33]" href={linkedIn} target="_blank" rel="noreferrer"><ExternalLink className="size-5 text-[#C9983C]" aria-hidden="true" /> LinkedIn profile</a>
              <p className="flex items-center gap-3 text-[#5D6875]"><MapPin className="size-5 text-[#C9983C]" aria-hidden="true" /> {location}</p>
              <div className="flex flex-col gap-3 pt-3 sm:flex-row lg:flex-col">
                <ButtonLink href={`mailto:${email}`} variant="primary">Send an Email</ButtonLink>
                <ButtonLink href={linkedIn} variant="outline">Connect on LinkedIn</ButtonLink>
                <ButtonLink href={cvUrl} variant="gold" download><Download className="size-4" aria-hidden="true" /> Download CV</ButtonLink>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#F7F8FA]">
            <CardContent className="pt-6">
              <h2 className="font-bold text-[#0B1F33]">Privacy notice</h2>
              <p className="mt-2 text-sm leading-7 text-[#5D6875]">Contact form submissions are stored only so Brian can respond to legitimate professional inquiries. Do not submit confidential information through the form. Read the full <Link href="/privacy" className="font-bold text-[#174A7E] hover:text-[#0B1F33]">privacy notice</Link>.</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-[#0B1F33]">Send a professional inquiry</h2>
            <p className="mt-2 text-sm leading-7 text-[#5D6875]">Share enough context to make the conversation useful: organization, opportunity type, timeline, and preferred next step.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
