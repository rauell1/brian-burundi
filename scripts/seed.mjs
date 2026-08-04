import "dotenv/config";
import pg from "pg";

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL ?? "postgresql://postgres:postgres@127.0.0.1:5432/app_db";
const pool = new Pool({ connectionString });

const experiences = [
  ["Roam Electric", "B2B Sales Lead", "Nairobi, Kenya", "February 2025", null, true, "Electric Mobility / Clean Energy", "Brian drives B2B market development for enterprise fleet customers evaluating electric motorcycles as commercially practical, cost-efficient, and sustainable mobility solutions.", ["Drive B2B market development by identifying and engaging logistics companies, ride-hailing services, and fleet operators.", "Develop sales strategies focused on cost savings, sustainability, and operational efficiency.", "Build relationships with key decision-makers to support long-term partnerships and repeat business.", "Forecast sales pipelines and maintain detailed CRM records covering client interactions, contracts, and deal status.", "Conduct on-site product demonstrations.", "Coordinate onboarding and training for enterprise fleet clients.", "Gather market and competitor intelligence to support product and marketing teams.", "Contribute to the refinement of go-to-market strategies."], ["Enterprise Sales", "Electric Mobility", "Fleet Solutions", "CRM", "Market Development", "Product Demonstrations", "Client Onboarding"], 1, true],
  ["Seeds for Sustainability Europe", "Business Development Lead", "Nairobi, Kenya", "February 2024", "December 2024", false, "Sustainability / ESG", "Brian supported B2B pipeline development and commercial outreach for sustainability and ESG-focused offerings, engaging senior stakeholders with structured proposals.", ["Identified, qualified, and secured prospective B2B accounts through strategic outreach.", "Managed end-to-end deal negotiations.", "Developed and presented business proposals to senior stakeholders and decision-makers.", "Managed the complete customer lifecycle.", "Built a structured database of prospective clients to support pipeline development."], ["Sustainability", "ESG", "Business Development", "Pipeline Development", "Proposals", "Negotiation"], 2, true],
  ["Jibu Incorporated", "Franchise Development Officer", "Nairobi, Kenya", "February 2022", "August 2023", false, "Social Enterprise / Water / Franchising", "Brian advanced franchise growth through customer-base development, team training, operational onboarding, compliance support, and technology adoption.", ["Led B2B and B2C customer-base development through targeted franchise growth strategies.", "Built and managed franchise teams.", "Delivered structured training on operating standards.", "Designed franchise onboarding, training, and operational-support programmes.", "Championed the adoption of Jibu technology platforms.", "Conducted hygiene and technology compliance audits."], ["Franchise Development", "Team Training", "Operations", "Compliance", "Customer Growth", "Technology Adoption"], 3, true],
  ["Ponea Health", "Partnership Acquisition Sales Executive", "Nairobi, Kenya", "September 2021", "February 2022", false, "Health Technology", "Brian helped expand Ponea Health’s B2B partner network by developing healthcare relationships, presenting solutions, negotiating agreements, and maintaining CRM discipline.", ["Developed strategic partnerships across Kenya’s healthcare sector.", "Expanded the company’s B2B partner network.", "Conducted product presentations at hospitals and retail locations.", "Led negotiations and supported agreement closure.", "Maintained CRM records.", "Resolved client issues to improve customer satisfaction."], ["Healthcare Partnerships", "Sales Presentations", "CRM", "Negotiation", "Client Success"], 4, true],
  ["AMREF Flying Doctors", "Business Development Associate", "Nairobi, Kenya", "October 2020", "August 2021", false, "Healthcare / Emergency Medical Services", "Brian identified healthcare partnership opportunities and supported institutional sales through proposals, negotiation, and contract-closure activity.", ["Identified healthcare partnership opportunities across Kenya.", "Expanded the B2B client network.", "Led deal negotiations.", "Developed proposals.", "Supported contract closure with healthcare institutions and retail partners."], ["Healthcare Business Development", "Institutional Sales", "Proposals", "Contract Negotiation"], 5, true],
  ["World Wildlife Fund for Nature – Kenya", "Public Engagement Assistant", "Nairobi, Kenya", "November 2018", "November 2019", false, "Conservation / Non-profit", "Brian supported conservation fundraising by engaging the public, recruiting individual donors, and developing relationship networks.", ["Conducted public engagement through face-to-face activations.", "Recruited individual donors.", "Helped build a sustainable funding base.", "Developed relationships with individual donors and organizational partners."], ["Public Engagement", "Donor Acquisition", "Conservation", "Relationship Management"], 6, true],
  ["Surf Kenya / Express Wi‑Fi by Facebook", "Regional Field Sales Associate", "Nairobi, Kenya", "February 2017", "May 2018", false, "Connectivity / Technology", "Brian recruited and managed SME agents for regional connectivity operations, while building tracking tools and scaling field-sales execution across three Nairobi satellite markets.", ["Recruited, vetted, trained, and managed SME agents delivering Express Wi‑Fi services.", "Expanded the agent network from 18 to 100.", "Launched and scaled operations across Ongata Rongai, Kiserian, and Ngong.", "Achieved a 90% monthly average revenue result.", "Developed CRM and Excel-based performance-tracking tools.", "Achieved 100% grant collection.", "Maintained zero loan defaults."], ["Regional Sales", "Agent Network Development", "Connectivity", "CRM", "Excel", "Performance Management"], 7, true],
  ["SasaPay", "Details pending verification", "Nairobi, Kenya", "Pending verification", null, false, "Financial Technology", "Details pending verification. This record should remain unpublished until Brian confirms the role, dates, scope, and achievements.", ["Details pending verification."], ["Financial Technology"], 90, false],
  ["Peleza", "Details pending verification", "Nairobi, Kenya", "Pending verification", null, false, "Business Verification / Technology Services", "Details pending verification. This record should remain unpublished until Brian confirms the role, dates, scope, and achievements.", ["Details pending verification."], ["Business Verification", "Technology Services"], 91, false],
  ["Byon", "Details pending verification", "Nairobi, Kenya", "Pending verification", null, false, "Technology-enabled Services", "Details pending verification. This record should remain unpublished until Brian confirms the role, dates, scope, and achievements.", ["Details pending verification."], ["Technology-enabled Services"], 92, false],
];

const metrics = [
  ["5", null, "+", "Years of professional experience", "Cross-sector B2B sales, business development, partnerships, and market-development experience in Kenya.", 1, true],
  ["10", null, null, "Organizations and sector touchpoints", "Experience and supplied sector touchpoints across growth-stage companies, institutions, and mission-driven organizations.", 2, true],
  ["18", null, " to 100", "SME agent network expansion", "Verified Surf Kenya / Express Wi‑Fi by Facebook result; this metric relates specifically to Brian’s regional field-sales role at Surf Kenya.", 3, true],
  ["90", null, "%", "Monthly average revenue achieved", "Verified Surf Kenya regional operation result; not generalized across all roles.", 4, true],
  ["100", null, "%", "Grant collection", "Verified Surf Kenya result tied to field-sales operations and agent management.", 5, true],
  ["0", null, null, "Loan defaults", "Verified Surf Kenya result connected to agent network management and field controls.", 6, true],
  ["3", null, null, "Locations launched and scaled", "Ongata Rongai, Kiserian, and Ngong during Brian’s Surf Kenya / Express Wi‑Fi by Facebook role.", 7, true],
];

const caseStudies = [
  ["Scaling an SME Agent Network", "Surf Kenya / Express Wi‑Fi by Facebook", "Expand access and grow the regional field-sales network.", "Recruited, vetted, trained, and managed SME agents while building performance-tracking systems.", "Agent network grew from 18 to 100, with operations scaled across Ongata Rongai, Kiserian, and Ngong.", 1, true],
  ["Supporting Enterprise Electric Mobility Adoption", "Roam Electric", "Help enterprise fleet customers evaluate electric motorcycles as commercially viable mobility solutions.", "Engaged logistics, ride-hailing, and fleet operators; developed value propositions around cost efficiency, sustainability, and operational performance; coordinated demonstrations and onboarding.", "A structured enterprise-sales contribution supporting customer evaluation, onboarding readiness, and go-to-market refinement. No unverified numerical result is claimed.", 2, true],
  ["Building Healthcare Partnerships", "Ponea Health and AMREF Flying Doctors", "Develop institutional and commercial relationships across the healthcare ecosystem.", "Identified opportunities, conducted presentations, developed proposals, led negotiations, and supported partnership closure.", "Expanded partnership-development activity across healthcare environments. No unverified numerical result is claimed.", 3, true],
];

const certifications = [
  ["Sustainability (ESG) & CSR Expert", "Seeds for Sustainability Europe", "May 2024", "December 2025", 1, true],
  ["Introduction to ESG: Environmental, Social and Governance", "Udemy", "June 2024", null, 2, true],
  ["Be the Manager People Won’t Leave", "LinkedIn Learning", "June 2024", null, 3, true],
  ["Management Skills", "Udemy", "February – March 2023", null, 4, true],
];

const settings = {
  publicEmail: "musinabrian@gmail.com",
  publicPhone: "0720 214 254",
  linkedInUrl: "https://linkedin.com/in/brianburudi",
  location: "Nairobi, Kenya",
  cvUrl: "/Brian-M-Burudi-CV.pdf",
  portraitUrl: "/Brian.jpeg",
};

async function main() {
  const client = await pool.connect();
  try {
    await client.query("begin");

    for (const item of experiences) {
      await client.query(
        `insert into "Experience" ("organization", "jobTitle", "location", "startDate", "endDate", "isCurrent", "sector", "summary", "responsibilities", "skills", "displayOrder", "isPublished")
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10::jsonb,$11,$12)
         on conflict ("organization", "jobTitle", "startDate") do update set "location"=excluded."location", "endDate"=excluded."endDate", "isCurrent"=excluded."isCurrent", "sector"=excluded."sector", "summary"=excluded."summary", "responsibilities"=excluded."responsibilities", "skills"=excluded."skills", "displayOrder"=excluded."displayOrder", "isPublished"=excluded."isPublished", "updatedAt"=now()`,
        [...item.slice(0, 8), JSON.stringify(item[8]), JSON.stringify(item[9]), item[10], item[11]],
      );
    }

    for (const metric of metrics) {
      await client.query(
        `insert into "ImpactMetric" ("value", "prefix", "suffix", "label", "context", "displayOrder", "isPublished") values ($1,$2,$3,$4,$5,$6,$7)
         on conflict ("label") do update set "value"=excluded."value", "prefix"=excluded."prefix", "suffix"=excluded."suffix", "context"=excluded."context", "displayOrder"=excluded."displayOrder", "isPublished"=excluded."isPublished"`,
        metric,
      );
    }

    for (const study of caseStudies) {
      await client.query(
        `insert into "CaseStudy" ("title", "organization", "challenge", "contribution", "outcome", "displayOrder", "isPublished") values ($1,$2,$3,$4,$5,$6,$7)
         on conflict ("title") do update set "organization"=excluded."organization", "challenge"=excluded."challenge", "contribution"=excluded."contribution", "outcome"=excluded."outcome", "displayOrder"=excluded."displayOrder", "isPublished"=excluded."isPublished", "updatedAt"=now()`,
        study,
      );
    }

    for (const certification of certifications) {
      await client.query(
        `insert into "Certification" ("title", "issuer", "issueDate", "expiryDate", "displayOrder", "isPublished") values ($1,$2,$3,$4,$5,$6)
         on conflict ("title", "issuer") do update set "issueDate"=excluded."issueDate", "expiryDate"=excluded."expiryDate", "displayOrder"=excluded."displayOrder", "isPublished"=excluded."isPublished"`,
        certification,
      );
    }

    for (const [key, value] of Object.entries(settings)) {
      await client.query(
        `insert into "SiteSetting" ("key", "value") values ($1,$2)
         on conflict ("key") do update set "value"=excluded."value", "updatedAt"=now()`,
        [key, value],
      );
    }

    if (process.env.ADMIN_EMAIL) {
      await client.query(
        `insert into "AdminUser" ("name", "email", "role") values ($1,$2,$3)
         on conflict ("email") do update set "updatedAt"=now()`,
        ["Brian M. Burudi Admin", process.env.ADMIN_EMAIL.toLowerCase(), "admin"],
      );
    }

    await client.query("commit");
    console.log("Seed completed without duplicating verified portfolio content.");
  } catch (error) {
    await client.query("rollback");
    console.error("Seed failed.");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main();
