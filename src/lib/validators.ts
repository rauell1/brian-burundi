import { z } from "zod";
import { inquiryTypes } from "@/lib/content";

export const contactFormSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120, "Name is too long."),
  email: z.string().trim().email("Please enter a valid work email.").max(160, "Email is too long."),
  organization: z.string().trim().min(2, "Please enter your organization.").max(160, "Organization is too long."),
  phone: z.string().trim().max(40, "Telephone is too long.").optional().or(z.literal("")),
  inquiryType: z.enum(inquiryTypes, { error: "Please select an inquiry type." }),
  message: z.string().trim().min(20, "Please provide at least 20 characters.").max(2500, "Message is too long."),
  consent: z.literal(true, { error: "Consent is required before sending." }),
  website: z.string().max(0, "Spam protection triggered.").optional().or(z.literal("")),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid administrator email."),
  password: z.string().min(8, "Enter the administrator password."),
});

export const experienceFormSchema = z.object({
  organization: z.string().trim().min(2).max(180),
  jobTitle: z.string().trim().min(2).max(180),
  location: z.string().trim().min(2).max(120),
  startDate: z.string().trim().min(2).max(80),
  endDate: z.string().trim().max(80).optional().or(z.literal("")),
  isCurrent: z.coerce.boolean().default(false),
  sector: z.string().trim().min(2).max(180),
  summary: z.string().trim().min(10).max(1200),
  responsibilities: z.string().trim().min(2),
  skills: z.string().trim().min(2),
  logoUrl: z.string().trim().max(300).optional().or(z.literal("")),
  displayOrder: z.coerce.number().int().min(0).max(999),
  isPublished: z.coerce.boolean().default(false),
});

export const metricFormSchema = z.object({
  value: z.string().trim().min(1).max(40),
  prefix: z.string().trim().max(20).optional().or(z.literal("")),
  suffix: z.string().trim().max(40).optional().or(z.literal("")),
  label: z.string().trim().min(2).max(160),
  context: z.string().trim().min(5).max(800),
  displayOrder: z.coerce.number().int().min(0).max(999),
  isPublished: z.coerce.boolean().default(false),
});

export const caseStudyFormSchema = z.object({
  title: z.string().trim().min(2).max(180),
  organization: z.string().trim().min(2).max(220),
  challenge: z.string().trim().min(5).max(900),
  contribution: z.string().trim().min(5).max(1400),
  outcome: z.string().trim().min(5).max(1000),
  imageUrl: z.string().trim().max(300).optional().or(z.literal("")),
  displayOrder: z.coerce.number().int().min(0).max(999),
  isPublished: z.coerce.boolean().default(false),
});

export const certificationFormSchema = z.object({
  title: z.string().trim().min(2).max(220),
  issuer: z.string().trim().min(2).max(180),
  issueDate: z.string().trim().min(2).max(80),
  expiryDate: z.string().trim().max(80).optional().or(z.literal("")),
  credentialUrl: z.string().trim().max(300).optional().or(z.literal("")),
  displayOrder: z.coerce.number().int().min(0).max(999),
  isPublished: z.coerce.boolean().default(false),
});

export const siteSettingsFormSchema = z.object({
  publicEmail: z.string().trim().email(),
  publicPhone: z.string().trim().min(5).max(60),
  linkedInUrl: z.string().trim().url(),
  location: z.string().trim().min(2).max(100),
  cvUrl: z.string().trim().min(2).max(300),
  portraitUrl: z.string().trim().min(2).max(300),
});

export const contactStatusSchema = z.object({
  status: z.enum(["new", "read", "replied", "archived"]),
});

export function formDataToObject(formData: FormData) {
  const data: Record<string, FormDataEntryValue | boolean> = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  data.isCurrent = formData.get("isCurrent") === "on";
  data.isPublished = formData.get("isPublished") === "on";
  data.consent = formData.get("consent") === "on";
  return data;
}

export function listFromTextarea(value: string) {
  return value
    .split(/\r?\n|;/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function skillsFromInput(value: string) {
  return value
    .split(/,|\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}
