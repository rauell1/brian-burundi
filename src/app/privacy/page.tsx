import type { Metadata } from "next";
import { PageIntro } from "@/components/public-sections";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbStructuredData } from "@/components/structured-data";
import { publicContact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "Privacy notice for Brian M. Burudi’s portfolio contact form and professional inquiry data handling.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main>
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }]} />
      <PageIntro
        eyebrow="Privacy"
        title="Privacy notice for professional inquiries."
        description="This notice explains how contact-form information is collected and used to respond to legitimate professional conversations."
      />
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="prose-executive pt-6 text-base">
            <h2 className="text-2xl font-bold text-[#0B1F33]">Information collected</h2>
            <p>The contact form collects your full name, work email, organization, optional telephone number, inquiry type, message, consent confirmation, status, and submission date. A honeypot field and basic rate limiting help reduce spam.</p>

            <h2 className="mt-8 text-2xl font-bold text-[#0B1F33]">Purpose of processing</h2>
            <p>Submitted information is used only to review and respond to professional inquiries about employment opportunities, strategic partnerships, consulting engagements, speaking invitations, and general business conversations.</p>

            <h2 className="mt-8 text-2xl font-bold text-[#0B1F33]">Storage and email notifications</h2>
            <p>Legitimate submissions are saved to the configured PostgreSQL database. If Resend is configured on the server, an email notification may be sent to the configured notification address. Email service credentials are never exposed to the browser.</p>

            <h2 className="mt-8 text-2xl font-bold text-[#0B1F33]">Retention and deletion</h2>
            <p>Inquiry information is retained only as long as needed for professional follow-up and relationship management. You may request correction or deletion by emailing Brian directly at <a className="font-bold text-[#174A7E]" href={`mailto:${publicContact.email}`}>{publicContact.email}</a>.</p>

            <h2 className="mt-8 text-2xl font-bold text-[#0B1F33]">Confidential information</h2>
            <p>Please do not submit confidential, legally privileged, or sensitive personal information through the contact form. Use direct communication channels for sensitive discussions after an initial professional connection has been established.</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
