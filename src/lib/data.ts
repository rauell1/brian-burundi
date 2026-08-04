import { asc, count, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { caseStudies, certifications, contactSubmissions, experiences, impactMetrics, siteSettings } from "@/db/schema";
import {
  defaultCaseStudies,
  defaultCertifications,
  defaultExperiences,
  defaultImpactMetrics,
  defaultSiteSettings,
  type CaseStudyContent,
  type CertificationContent,
  type ExperienceContent,
  type ImpactMetricContent,
} from "@/lib/content";

export type ContactSubmissionRecord = typeof contactSubmissions.$inferSelect;

async function safe<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await query();
  } catch {
    return fallback;
  }
}

export async function getPublishedExperiences(): Promise<ExperienceContent[]> {
  return safe(
    async () =>
      db
        .select()
        .from(experiences)
        .where(eq(experiences.isPublished, true))
        .orderBy(asc(experiences.displayOrder)),
    defaultExperiences.filter((experience) => experience.isPublished).sort((a, b) => a.displayOrder - b.displayOrder),
  );
}

export async function getAllExperiences() {
  return safe(async () => db.select().from(experiences).orderBy(asc(experiences.displayOrder)), defaultExperiences);
}

export async function getPublishedImpactMetrics(): Promise<ImpactMetricContent[]> {
  return safe(
    async () =>
      db
        .select()
        .from(impactMetrics)
        .where(eq(impactMetrics.isPublished, true))
        .orderBy(asc(impactMetrics.displayOrder)),
    defaultImpactMetrics.filter((metric) => metric.isPublished).sort((a, b) => a.displayOrder - b.displayOrder),
  );
}

export async function getAllImpactMetrics() {
  return safe(async () => db.select().from(impactMetrics).orderBy(asc(impactMetrics.displayOrder)), defaultImpactMetrics);
}

export async function getPublishedCaseStudies(): Promise<CaseStudyContent[]> {
  return safe(
    async () =>
      db
        .select()
        .from(caseStudies)
        .where(eq(caseStudies.isPublished, true))
        .orderBy(asc(caseStudies.displayOrder)),
    defaultCaseStudies.filter((study) => study.isPublished).sort((a, b) => a.displayOrder - b.displayOrder),
  );
}

export async function getAllCaseStudies() {
  return safe(async () => db.select().from(caseStudies).orderBy(asc(caseStudies.displayOrder)), defaultCaseStudies);
}

export async function getPublishedCertifications(): Promise<CertificationContent[]> {
  return safe(
    async () =>
      db
        .select()
        .from(certifications)
        .where(eq(certifications.isPublished, true))
        .orderBy(asc(certifications.displayOrder)),
    defaultCertifications.filter((certification) => certification.isPublished).sort((a, b) => a.displayOrder - b.displayOrder),
  );
}

export async function getAllCertifications() {
  return safe(async () => db.select().from(certifications).orderBy(asc(certifications.displayOrder)), defaultCertifications);
}

export async function getSiteSettings() {
  const rows = await safe(async () => db.select().from(siteSettings), [] as Array<typeof siteSettings.$inferSelect>);
  return rows.reduce<Record<string, string>>((settings, row) => {
    settings[row.key] = row.value;
    return settings;
  }, { ...defaultSiteSettings });
}

export async function getContactSubmissions() {
  return safe(
    async () => db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt)),
    [] as ContactSubmissionRecord[],
  );
}

export async function getAdminStats() {
  return safe(
    async () => {
      const [publishedExperienceRows, publishedCaseStudyRows, totalSubmissionRows, newSubmissionRows] = await Promise.all([
        db.select({ count: count() }).from(experiences).where(eq(experiences.isPublished, true)),
        db.select({ count: count() }).from(caseStudies).where(eq(caseStudies.isPublished, true)),
        db.select({ count: count() }).from(contactSubmissions),
        db.select({ count: count() }).from(contactSubmissions).where(eq(contactSubmissions.status, "new")),
      ]);

      return {
        publishedExperiences: publishedExperienceRows[0]?.count ?? 0,
        publishedCaseStudies: publishedCaseStudyRows[0]?.count ?? 0,
        totalSubmissions: totalSubmissionRows[0]?.count ?? 0,
        unreadInquiries: newSubmissionRows[0]?.count ?? 0,
      };
    },
    {
      publishedExperiences: defaultExperiences.filter((experience) => experience.isPublished).length,
      publishedCaseStudies: defaultCaseStudies.filter((study) => study.isPublished).length,
      totalSubmissions: 0,
      unreadInquiries: 0,
    },
  );
}
