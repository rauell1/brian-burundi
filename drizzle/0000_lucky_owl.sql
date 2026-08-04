CREATE TABLE "AdminUser" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"role" text DEFAULT 'admin' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "CaseStudy" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"organization" text NOT NULL,
	"challenge" text NOT NULL,
	"contribution" text NOT NULL,
	"outcome" text NOT NULL,
	"imageUrl" text,
	"displayOrder" integer DEFAULT 0 NOT NULL,
	"isPublished" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Certification" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"issuer" text NOT NULL,
	"issueDate" text NOT NULL,
	"expiryDate" text,
	"credentialUrl" text,
	"displayOrder" integer DEFAULT 0 NOT NULL,
	"isPublished" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ContactSubmission" (
	"id" serial PRIMARY KEY NOT NULL,
	"fullName" text NOT NULL,
	"email" text NOT NULL,
	"organization" text NOT NULL,
	"phone" text,
	"inquiryType" text NOT NULL,
	"message" text NOT NULL,
	"consent" boolean NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization" text NOT NULL,
	"jobTitle" text NOT NULL,
	"location" text NOT NULL,
	"startDate" text NOT NULL,
	"endDate" text,
	"isCurrent" boolean DEFAULT false NOT NULL,
	"sector" text NOT NULL,
	"summary" text NOT NULL,
	"responsibilities" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"skills" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"logoUrl" text,
	"displayOrder" integer DEFAULT 0 NOT NULL,
	"isPublished" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ImpactMetric" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"prefix" text,
	"suffix" text,
	"label" text NOT NULL,
	"context" text NOT NULL,
	"displayOrder" integer DEFAULT 0 NOT NULL,
	"isPublished" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "SiteSetting" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"value" text NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "AdminUser_email_unique" ON "AdminUser" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "CaseStudy_title_unique" ON "CaseStudy" USING btree ("title");--> statement-breakpoint
CREATE UNIQUE INDEX "Certification_identity_unique" ON "Certification" USING btree ("title","issuer");--> statement-breakpoint
CREATE UNIQUE INDEX "Experience_identity_unique" ON "Experience" USING btree ("organization","jobTitle","startDate");--> statement-breakpoint
CREATE UNIQUE INDEX "ImpactMetric_label_unique" ON "ImpactMetric" USING btree ("label");--> statement-breakpoint
CREATE UNIQUE INDEX "SiteSetting_key_unique" ON "SiteSetting" USING btree ("key");