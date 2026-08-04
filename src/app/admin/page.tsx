import type { Metadata } from "next";
import Link from "next/link";
import { Eye, Inbox, Layers, LogOut, Settings, ShieldCheck, type LucideIcon } from "lucide-react";
import { ConfirmButton } from "@/components/ui/confirm-button";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Select, Textarea } from "@/components/ui/forms";
import { SubmitButton } from "@/components/ui/submit-button";
import { defaultSiteSettings, pendingOrganizationNote } from "@/lib/content";
import { getAdminStats, getAllCaseStudies, getAllCertifications, getAllExperiences, getAllImpactMetrics, getContactSubmissions, getSiteSettings } from "@/lib/data";
import { requireAdmin } from "@/lib/auth";
import {
  createCaseStudyAction,
  createCertificationAction,
  createExperienceAction,
  createMetricAction,
  deleteCaseStudyAction,
  deleteCertificationAction,
  deleteExperienceAction,
  deleteMetricAction,
  logoutAction,
  updateCaseStudyAction,
  updateCertificationAction,
  updateExperienceAction,
  updateMetricAction,
  updateSiteSettingsAction,
  updateSubmissionStatusAction,
} from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ toast?: string }>;

type EditableExperience = Awaited<ReturnType<typeof getAllExperiences>>[number] & { id?: number };
type EditableMetric = Awaited<ReturnType<typeof getAllImpactMetrics>>[number] & { id?: number };
type EditableCaseStudy = Awaited<ReturnType<typeof getAllCaseStudies>>[number] & { id?: number };
type EditableCertification = Awaited<ReturnType<typeof getAllCertifications>>[number] & { id?: number };

function Checkbox({ name, defaultChecked, label }: { name: string; defaultChecked?: boolean; label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-[#16202A]">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="size-4 rounded border-[#DDE3E9] accent-[#174A7E]" /> {label}
    </label>
  );
}

function ExperienceForm({ experience, action, buttonText }: { experience?: EditableExperience; action: (formData: FormData) => Promise<void>; buttonText: string }) {
  return (
    <form action={action} className="grid gap-4 rounded-2xl border border-[#DDE3E9] bg-[#F7F8FA] p-4">
      {experience?.id ? <input type="hidden" name="id" value={experience.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <div><Label>Organization</Label><Input name="organization" defaultValue={experience?.organization ?? ""} required /></div>
        <div><Label>Job title</Label><Input name="jobTitle" defaultValue={experience?.jobTitle ?? ""} required /></div>
        <div><Label>Location</Label><Input name="location" defaultValue={experience?.location ?? "Nairobi, Kenya"} required /></div>
        <div><Label>Sector</Label><Input name="sector" defaultValue={experience?.sector ?? ""} required /></div>
        <div><Label>Start date</Label><Input name="startDate" defaultValue={experience?.startDate ?? ""} required /></div>
        <div><Label>End date</Label><Input name="endDate" defaultValue={experience?.endDate ?? ""} /></div>
        <div><Label>Logo URL</Label><Input name="logoUrl" defaultValue={experience?.logoUrl ?? ""} /></div>
        <div><Label>Display order</Label><Input name="displayOrder" type="number" defaultValue={experience?.displayOrder ?? 50} required /></div>
      </div>
      <div><Label>Summary</Label><Textarea name="summary" defaultValue={experience?.summary ?? ""} required /></div>
      <div><Label>Responsibilities — one per line</Label><Textarea name="responsibilities" defaultValue={experience?.responsibilities?.join("\n") ?? ""} required /></div>
      <div><Label>Skills — comma separated</Label><Textarea name="skills" defaultValue={experience?.skills?.join(", ") ?? ""} required /></div>
      <div className="flex flex-wrap gap-5"><Checkbox name="isCurrent" defaultChecked={experience?.isCurrent} label="Current role" /><Checkbox name="isPublished" defaultChecked={experience?.isPublished} label="Published" /></div>
      <SubmitButton>{buttonText}</SubmitButton>
    </form>
  );
}

function MetricForm({ metric, action, buttonText }: { metric?: EditableMetric; action: (formData: FormData) => Promise<void>; buttonText: string }) {
  return (
    <form action={action} className="grid gap-4 rounded-2xl border border-[#DDE3E9] bg-[#F7F8FA] p-4">
      {metric?.id ? <input type="hidden" name="id" value={metric.id} /> : null}
      <div className="grid gap-4 md:grid-cols-4">
        <div><Label>Prefix</Label><Input name="prefix" defaultValue={metric?.prefix ?? ""} /></div>
        <div><Label>Value</Label><Input name="value" defaultValue={metric?.value ?? ""} required /></div>
        <div><Label>Suffix</Label><Input name="suffix" defaultValue={metric?.suffix ?? ""} /></div>
        <div><Label>Display order</Label><Input name="displayOrder" type="number" defaultValue={metric?.displayOrder ?? 50} required /></div>
      </div>
      <div><Label>Label</Label><Input name="label" defaultValue={metric?.label ?? ""} required /></div>
      <div><Label>Context</Label><Textarea name="context" defaultValue={metric?.context ?? ""} required /></div>
      <Checkbox name="isPublished" defaultChecked={metric?.isPublished} label="Published" />
      <SubmitButton>{buttonText}</SubmitButton>
    </form>
  );
}

function CaseStudyForm({ study, action, buttonText }: { study?: EditableCaseStudy; action: (formData: FormData) => Promise<void>; buttonText: string }) {
  return (
    <form action={action} className="grid gap-4 rounded-2xl border border-[#DDE3E9] bg-[#F7F8FA] p-4">
      {study?.id ? <input type="hidden" name="id" value={study.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <div><Label>Title</Label><Input name="title" defaultValue={study?.title ?? ""} required /></div>
        <div><Label>Organization</Label><Input name="organization" defaultValue={study?.organization ?? ""} required /></div>
        <div><Label>Image URL</Label><Input name="imageUrl" defaultValue={study?.imageUrl ?? ""} /></div>
        <div><Label>Display order</Label><Input name="displayOrder" type="number" defaultValue={study?.displayOrder ?? 50} required /></div>
      </div>
      <div><Label>Challenge</Label><Textarea name="challenge" defaultValue={study?.challenge ?? ""} required /></div>
      <div><Label>Contribution</Label><Textarea name="contribution" defaultValue={study?.contribution ?? ""} required /></div>
      <div><Label>Outcome</Label><Textarea name="outcome" defaultValue={study?.outcome ?? ""} required /></div>
      <Checkbox name="isPublished" defaultChecked={study?.isPublished} label="Published" />
      <SubmitButton>{buttonText}</SubmitButton>
    </form>
  );
}

function CertificationForm({ certification, action, buttonText }: { certification?: EditableCertification; action: (formData: FormData) => Promise<void>; buttonText: string }) {
  return (
    <form action={action} className="grid gap-4 rounded-2xl border border-[#DDE3E9] bg-[#F7F8FA] p-4">
      {certification?.id ? <input type="hidden" name="id" value={certification.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <div><Label>Title</Label><Input name="title" defaultValue={certification?.title ?? ""} required /></div>
        <div><Label>Issuer</Label><Input name="issuer" defaultValue={certification?.issuer ?? ""} required /></div>
        <div><Label>Issue date</Label><Input name="issueDate" defaultValue={certification?.issueDate ?? ""} required /></div>
        <div><Label>Expiry date</Label><Input name="expiryDate" defaultValue={certification?.expiryDate ?? ""} /></div>
        <div><Label>Credential URL</Label><Input name="credentialUrl" defaultValue={certification?.credentialUrl ?? ""} /></div>
        <div><Label>Display order</Label><Input name="displayOrder" type="number" defaultValue={certification?.displayOrder ?? 50} required /></div>
      </div>
      <Checkbox name="isPublished" defaultChecked={certification?.isPublished} label="Published" />
      <SubmitButton>{buttonText}</SubmitButton>
    </form>
  );
}

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  const [session, params] = await Promise.all([requireAdmin(), searchParams]);
  const [stats, experiences, metrics, studies, certifications, submissions, settings] = await Promise.all([
    getAdminStats(),
    getAllExperiences(),
    getAllImpactMetrics(),
    getAllCaseStudies(),
    getAllCertifications(),
    getContactSubmissions(),
    getSiteSettings(),
  ]);
  const statsCards: Array<{ label: string; value: number; Icon: LucideIcon }> = [
    { label: "Published experience entries", value: stats.publishedExperiences, Icon: Layers },
    { label: "Published case studies", value: stats.publishedCaseStudies, Icon: ShieldCheck },
    { label: "Total contact submissions", value: stats.totalSubmissions, Icon: Inbox },
    { label: "New unread inquiries", value: stats.unreadInquiries, Icon: Inbox },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <Badge>Protected dashboard</Badge>
          <h1 className="mt-3 text-4xl font-bold text-[#0B1F33]">Portfolio administration</h1>
          <p className="mt-2 text-[#5D6875]">Signed in as {session.name}. Manage verified public content carefully.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/" variant="outline"><Eye className="size-4" aria-hidden="true" /> Preview site</ButtonLink>
          <form action={logoutAction}><button className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#DDE3E9] bg-white px-5 py-2.5 text-sm font-semibold text-[#0B1F33]"><LogOut className="size-4" aria-hidden="true" /> Log out</button></form>
        </div>
      </div>

      {params.toast ? <p className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-800" role="status">{params.toast}</p> : null}

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Dashboard statistics">
        {statsCards.map(({ label, value, Icon }) => (
          <Card key={label}>
            <CardContent className="pt-6">
              <Icon className="size-7 text-[#16847A]" aria-hidden="true" />
              <p className="mt-4 text-3xl font-bold text-[#0B1F33]">{value}</p>
              <p className="mt-1 text-sm text-[#5D6875]">{label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-10 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3"><Settings className="size-6 text-[#C9983C]" aria-hidden="true" /><h2 className="text-2xl font-bold text-[#0B1F33]">Public contact, portrait, and CV settings</h2></div>
            <p className="mt-2 text-sm leading-6 text-[#5D6875]">To replace the portrait or CV, upload the asset to `/public` or a durable asset host, then set the URL/path below. The expected supplied portrait path is `/Brian.jpeg`.</p>
            <form action={updateSiteSettingsAction} className="mt-5 grid gap-4 md:grid-cols-2">
              {Object.entries(defaultSiteSettings).map(([key, fallback]) => (
                <div key={key}>
                  <Label>{key}</Label>
                  <Input name={key} defaultValue={settings[key] ?? fallback} required />
                </div>
              ))}
              <div className="md:col-span-2"><SubmitButton>Update settings</SubmitButton></div>
            </form>
          </CardContent>
        </Card>

        <details className="rounded-3xl border border-[#DDE3E9] bg-white p-6 shadow-sm" open>
          <summary className="cursor-pointer text-2xl font-bold text-[#0B1F33]">Experience entries</summary>
          <p className="mt-2 text-sm leading-6 text-[#5D6875]">{pendingOrganizationNote}</p>
          <div className="mt-6"><ExperienceForm action={createExperienceAction} buttonText="Add experience" /></div>
          <div className="mt-8 space-y-5">
            {experiences.map((experience) => (
              <details key={`${experience.organization}-${experience.jobTitle}-${experience.startDate}`} className="rounded-2xl border border-[#DDE3E9] p-4">
                <summary className="cursor-pointer font-bold text-[#0B1F33]">{experience.organization} — {experience.jobTitle} {experience.isPublished ? "" : "(unpublished)"}</summary>
                <div className="mt-4"><ExperienceForm experience={experience as EditableExperience} action={updateExperienceAction} buttonText="Update experience" /></div>
                {(experience as EditableExperience).id ? <form action={deleteExperienceAction} className="mt-3"><input type="hidden" name="id" value={(experience as EditableExperience).id} /><ConfirmButton message="Delete this experience entry?">Delete experience</ConfirmButton></form> : null}
              </details>
            ))}
          </div>
        </details>

        <details className="rounded-3xl border border-[#DDE3E9] bg-white p-6 shadow-sm">
          <summary className="cursor-pointer text-2xl font-bold text-[#0B1F33]">Impact metrics</summary>
          <div className="mt-6"><MetricForm action={createMetricAction} buttonText="Add metric" /></div>
          <div className="mt-8 space-y-5">
            {metrics.map((metric) => (
              <details key={metric.label} className="rounded-2xl border border-[#DDE3E9] p-4">
                <summary className="cursor-pointer font-bold text-[#0B1F33]">{metric.label} {metric.isPublished ? "" : "(unpublished)"}</summary>
                <div className="mt-4"><MetricForm metric={metric as EditableMetric} action={updateMetricAction} buttonText="Update metric" /></div>
                {(metric as EditableMetric).id ? <form action={deleteMetricAction} className="mt-3"><input type="hidden" name="id" value={(metric as EditableMetric).id} /><ConfirmButton message="Delete this metric?">Delete metric</ConfirmButton></form> : null}
              </details>
            ))}
          </div>
        </details>

        <details className="rounded-3xl border border-[#DDE3E9] bg-white p-6 shadow-sm">
          <summary className="cursor-pointer text-2xl font-bold text-[#0B1F33]">Case studies</summary>
          <div className="mt-6"><CaseStudyForm action={createCaseStudyAction} buttonText="Add case study" /></div>
          <div className="mt-8 space-y-5">
            {studies.map((study) => (
              <details key={study.title} className="rounded-2xl border border-[#DDE3E9] p-4">
                <summary className="cursor-pointer font-bold text-[#0B1F33]">{study.title} {study.isPublished ? "" : "(unpublished)"}</summary>
                <div className="mt-4"><CaseStudyForm study={study as EditableCaseStudy} action={updateCaseStudyAction} buttonText="Update case study" /></div>
                {(study as EditableCaseStudy).id ? <form action={deleteCaseStudyAction} className="mt-3"><input type="hidden" name="id" value={(study as EditableCaseStudy).id} /><ConfirmButton message="Delete this case study?">Delete case study</ConfirmButton></form> : null}
              </details>
            ))}
          </div>
        </details>

        <details className="rounded-3xl border border-[#DDE3E9] bg-white p-6 shadow-sm">
          <summary className="cursor-pointer text-2xl font-bold text-[#0B1F33]">Certifications</summary>
          <div className="mt-6"><CertificationForm action={createCertificationAction} buttonText="Add certification" /></div>
          <div className="mt-8 space-y-5">
            {certifications.map((certification) => (
              <details key={`${certification.title}-${certification.issuer}`} className="rounded-2xl border border-[#DDE3E9] p-4">
                <summary className="cursor-pointer font-bold text-[#0B1F33]">{certification.title} {certification.isPublished ? "" : "(unpublished)"}</summary>
                <div className="mt-4"><CertificationForm certification={certification as EditableCertification} action={updateCertificationAction} buttonText="Update certification" /></div>
                {(certification as EditableCertification).id ? <form action={deleteCertificationAction} className="mt-3"><input type="hidden" name="id" value={(certification as EditableCertification).id} /><ConfirmButton message="Delete this certification?">Delete certification</ConfirmButton></form> : null}
              </details>
            ))}
          </div>
        </details>

        <details className="rounded-3xl border border-[#DDE3E9] bg-white p-6 shadow-sm">
          <summary className="cursor-pointer text-2xl font-bold text-[#0B1F33]">Contact submissions</summary>
          <div className="mt-6 space-y-4">
            {submissions.length ? submissions.map((submission) => (
              <Card key={submission.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col justify-between gap-4 lg:flex-row">
                    <div>
                      <h3 className="font-bold text-[#0B1F33]">{submission.fullName} — {submission.organization}</h3>
                      <p className="mt-1 text-sm text-[#5D6875]">{submission.email} {submission.phone ? `• ${submission.phone}` : ""}</p>
                      <p className="mt-2 text-sm font-semibold text-[#174A7E]">{submission.inquiryType}</p>
                      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#5D6875]">{submission.message}</p>
                    </div>
                    <form action={updateSubmissionStatusAction} className="min-w-52 space-y-3">
                      <input type="hidden" name="id" value={submission.id} />
                      <Label>Status</Label>
                      <Select name="status" defaultValue={submission.status}>
                        {['new', 'read', 'replied', 'archived'].map((status) => <option key={status} value={status}>{status}</option>)}
                      </Select>
                      <SubmitButton>Update status</SubmitButton>
                    </form>
                  </div>
                </CardContent>
              </Card>
            )) : <p className="text-sm text-[#5D6875]">No contact submissions yet.</p>}
          </div>
        </details>
      </section>

      <p className="mt-8 text-sm text-[#5D6875]">Need a deeper preview? Open <Link href="/experience" className="font-bold text-[#174A7E]">experience</Link>, <Link href="/impact" className="font-bold text-[#174A7E]"> impact</Link>, and <Link href="/contact" className="font-bold text-[#174A7E]"> contact</Link> after saving.</p>
    </main>
  );
}
