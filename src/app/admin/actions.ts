"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { caseStudies, certifications, contactSubmissions, experiences, impactMetrics, siteSettings } from "@/db/schema";
import { clearAdminSession, requireAdmin } from "@/lib/auth";
import {
  caseStudyFormSchema,
  certificationFormSchema,
  contactStatusSchema,
  experienceFormSchema,
  formDataToObject,
  listFromTextarea,
  metricFormSchema,
  siteSettingsFormSchema,
  skillsFromInput,
} from "@/lib/validators";
import { eq } from "drizzle-orm";

function idFromForm(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id < 1) throw new Error("Invalid record id.");
  return id;
}

function refreshAdmin(message: string) {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/experience");
  revalidatePath("/expertise");
  revalidatePath("/impact");
  revalidatePath("/contact");
  revalidatePath("/admin");
  redirect(`/admin?toast=${encodeURIComponent(message)}`);
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function createExperienceAction(formData: FormData) {
  await requireAdmin();
  const parsed = experienceFormSchema.parse(formDataToObject(formData));
  await db.insert(experiences).values({
    ...parsed,
    endDate: parsed.endDate || null,
    logoUrl: parsed.logoUrl || null,
    responsibilities: listFromTextarea(parsed.responsibilities),
    skills: skillsFromInput(parsed.skills),
  });
  refreshAdmin("Experience entry created.");
}

export async function updateExperienceAction(formData: FormData) {
  await requireAdmin();
  const id = idFromForm(formData);
  const parsed = experienceFormSchema.parse(formDataToObject(formData));
  await db.update(experiences).set({
    ...parsed,
    endDate: parsed.endDate || null,
    logoUrl: parsed.logoUrl || null,
    responsibilities: listFromTextarea(parsed.responsibilities),
    skills: skillsFromInput(parsed.skills),
    updatedAt: new Date(),
  }).where(eq(experiences.id, id));
  refreshAdmin("Experience entry updated.");
}

export async function deleteExperienceAction(formData: FormData) {
  await requireAdmin();
  await db.delete(experiences).where(eq(experiences.id, idFromForm(formData)));
  refreshAdmin("Experience entry deleted.");
}

export async function createMetricAction(formData: FormData) {
  await requireAdmin();
  const parsed = metricFormSchema.parse(formDataToObject(formData));
  await db.insert(impactMetrics).values({ ...parsed, prefix: parsed.prefix || null, suffix: parsed.suffix || null });
  refreshAdmin("Impact metric created.");
}

export async function updateMetricAction(formData: FormData) {
  await requireAdmin();
  const id = idFromForm(formData);
  const parsed = metricFormSchema.parse(formDataToObject(formData));
  await db.update(impactMetrics).set({ ...parsed, prefix: parsed.prefix || null, suffix: parsed.suffix || null }).where(eq(impactMetrics.id, id));
  refreshAdmin("Impact metric updated.");
}

export async function deleteMetricAction(formData: FormData) {
  await requireAdmin();
  await db.delete(impactMetrics).where(eq(impactMetrics.id, idFromForm(formData)));
  refreshAdmin("Impact metric deleted.");
}

export async function createCaseStudyAction(formData: FormData) {
  await requireAdmin();
  const parsed = caseStudyFormSchema.parse(formDataToObject(formData));
  await db.insert(caseStudies).values({ ...parsed, imageUrl: parsed.imageUrl || null });
  refreshAdmin("Case study created.");
}

export async function updateCaseStudyAction(formData: FormData) {
  await requireAdmin();
  const id = idFromForm(formData);
  const parsed = caseStudyFormSchema.parse(formDataToObject(formData));
  await db.update(caseStudies).set({ ...parsed, imageUrl: parsed.imageUrl || null, updatedAt: new Date() }).where(eq(caseStudies.id, id));
  refreshAdmin("Case study updated.");
}

export async function deleteCaseStudyAction(formData: FormData) {
  await requireAdmin();
  await db.delete(caseStudies).where(eq(caseStudies.id, idFromForm(formData)));
  refreshAdmin("Case study deleted.");
}

export async function createCertificationAction(formData: FormData) {
  await requireAdmin();
  const parsed = certificationFormSchema.parse(formDataToObject(formData));
  await db.insert(certifications).values({ ...parsed, expiryDate: parsed.expiryDate || null, credentialUrl: parsed.credentialUrl || null });
  refreshAdmin("Certification created.");
}

export async function updateCertificationAction(formData: FormData) {
  await requireAdmin();
  const id = idFromForm(formData);
  const parsed = certificationFormSchema.parse(formDataToObject(formData));
  await db.update(certifications).set({ ...parsed, expiryDate: parsed.expiryDate || null, credentialUrl: parsed.credentialUrl || null }).where(eq(certifications.id, id));
  refreshAdmin("Certification updated.");
}

export async function deleteCertificationAction(formData: FormData) {
  await requireAdmin();
  await db.delete(certifications).where(eq(certifications.id, idFromForm(formData)));
  refreshAdmin("Certification deleted.");
}

export async function updateSubmissionStatusAction(formData: FormData) {
  await requireAdmin();
  const id = idFromForm(formData);
  const parsed = contactStatusSchema.parse({ status: formData.get("status") });
  await db.update(contactSubmissions).set({ status: parsed.status }).where(eq(contactSubmissions.id, id));
  refreshAdmin("Contact submission status updated.");
}

export async function updateSiteSettingsAction(formData: FormData) {
  await requireAdmin();
  const parsed = siteSettingsFormSchema.parse(Object.fromEntries(formData.entries()));
  await Promise.all(
    Object.entries(parsed).map(([key, value]) =>
      db.insert(siteSettings).values({ key, value, updatedAt: new Date() }).onConflictDoUpdate({
        target: siteSettings.key,
        set: { value, updatedAt: new Date() },
      }),
    ),
  );
  refreshAdmin("Public contact and asset settings updated.");
}
