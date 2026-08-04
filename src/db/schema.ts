import { boolean, integer, jsonb, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const adminUsers = pgTable(
  "AdminUser",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    role: text("role").notNull().default("admin"),
    createdAt: timestamp("createdAt", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("AdminUser_email_unique").on(table.email),
  }),
);

export const experiences = pgTable(
  "Experience",
  {
    id: serial("id").primaryKey(),
    organization: text("organization").notNull(),
    jobTitle: text("jobTitle").notNull(),
    location: text("location").notNull(),
    startDate: text("startDate").notNull(),
    endDate: text("endDate"),
    isCurrent: boolean("isCurrent").notNull().default(false),
    sector: text("sector").notNull(),
    summary: text("summary").notNull(),
    responsibilities: jsonb("responsibilities").$type<string[]>().notNull().default([]),
    skills: jsonb("skills").$type<string[]>().notNull().default([]),
    logoUrl: text("logoUrl"),
    displayOrder: integer("displayOrder").notNull().default(0),
    isPublished: boolean("isPublished").notNull().default(true),
    createdAt: timestamp("createdAt", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    identityIdx: uniqueIndex("Experience_identity_unique").on(table.organization, table.jobTitle, table.startDate),
  }),
);

export const impactMetrics = pgTable(
  "ImpactMetric",
  {
    id: serial("id").primaryKey(),
    value: text("value").notNull(),
    prefix: text("prefix"),
    suffix: text("suffix"),
    label: text("label").notNull(),
    context: text("context").notNull(),
    displayOrder: integer("displayOrder").notNull().default(0),
    isPublished: boolean("isPublished").notNull().default(true),
  },
  (table) => ({
    labelIdx: uniqueIndex("ImpactMetric_label_unique").on(table.label),
  }),
);

export const caseStudies = pgTable(
  "CaseStudy",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    organization: text("organization").notNull(),
    challenge: text("challenge").notNull(),
    contribution: text("contribution").notNull(),
    outcome: text("outcome").notNull(),
    imageUrl: text("imageUrl"),
    displayOrder: integer("displayOrder").notNull().default(0),
    isPublished: boolean("isPublished").notNull().default(true),
    createdAt: timestamp("createdAt", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    titleIdx: uniqueIndex("CaseStudy_title_unique").on(table.title),
  }),
);

export const certifications = pgTable(
  "Certification",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    issuer: text("issuer").notNull(),
    issueDate: text("issueDate").notNull(),
    expiryDate: text("expiryDate"),
    credentialUrl: text("credentialUrl"),
    displayOrder: integer("displayOrder").notNull().default(0),
    isPublished: boolean("isPublished").notNull().default(true),
  },
  (table) => ({
    credentialIdx: uniqueIndex("Certification_identity_unique").on(table.title, table.issuer),
  }),
);

export const contactSubmissions = pgTable("ContactSubmission", {
  id: serial("id").primaryKey(),
  fullName: text("fullName").notNull(),
  email: text("email").notNull(),
  organization: text("organization").notNull(),
  phone: text("phone"),
  inquiryType: text("inquiryType").notNull(),
  message: text("message").notNull(),
  consent: boolean("consent").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("createdAt", { withTimezone: true }).notNull().defaultNow(),
});

export const siteSettings = pgTable(
  "SiteSetting",
  {
    id: serial("id").primaryKey(),
    key: text("key").notNull(),
    value: text("value").notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    keyIdx: uniqueIndex("SiteSetting_key_unique").on(table.key),
  }),
);
