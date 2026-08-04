export type ExperienceContent = {
  organization: string;
  jobTitle: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  sector: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
  logoUrl?: string | null;
  displayOrder: number;
  isPublished: boolean;
};

export type ImpactMetricContent = {
  value: string;
  prefix?: string | null;
  suffix?: string | null;
  label: string;
  context: string;
  displayOrder: number;
  isPublished: boolean;
};

export type CaseStudyContent = {
  title: string;
  organization: string;
  challenge: string;
  contribution: string;
  outcome: string;
  imageUrl?: string | null;
  displayOrder: number;
  isPublished: boolean;
};

export type CertificationContent = {
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string | null;
  credentialUrl?: string | null;
  displayOrder: number;
  isPublished: boolean;
};

export const publicContact = {
  name: "Brian M. Burudi",
  role: "B2B Sales Lead | Business Development & Strategic Partnerships",
  shortRole: "B2B Sales Lead",
  location: "Nairobi, Kenya",
  email: "musinabrian@gmail.com",
  phone: "0720 214 254",
  linkedIn: "https://linkedin.com/in/brianburudi",
  cvPath: "/Brian-M-Burudi-CV.pdf",
};

export const organizationNames = [
  "Roam",
  "Jibu",
  "Ponea Health",
  "Express Wi‑Fi by Facebook / Surf",
  "WWF Kenya",
  "AMREF Flying Doctors",
  "Seeds for Sustainability Europe",
  "SasaPay",
  "Peleza",
  "Byon",
];

export const pendingOrganizationNote =
  "Roles, dates, and achievements for SasaPay, Peleza, and Byon must be verified with Brian before being published.";

export const professionalSummary =
  "I am a results-driven B2B Sales Lead and Commercial Growth Consultant with over five years of experience partnering with organizations to accelerate revenue, build strategic partnerships, and expand market presence across Kenya and emerging markets.\n\nMy expertise spans full-cycle enterprise sales, key account management, franchise development, and go-to-market execution. Whether you are scaling operations in clean energy, health tech, sustainability, or connectivity, I translate your market needs into commercially viable partnerships that deliver long-term, measurable value.";

export const careerQualities = [
  "Driving Commercial Growth",
  "Forging Strategic Partnerships",
  "Scaling Market Operations",
  "Delivering Data-Informed Strategy",
  "Building Enterprise Pipelines",
  "Unlocking Emerging Markets",
];

export const defaultExperiences: ExperienceContent[] = [
  {
    organization: "Roam Electric",
    jobTitle: "B2B Sales Lead",
    location: "Nairobi, Kenya",
    startDate: "February 2025",
    endDate: null,
    isCurrent: true,
    sector: "Electric Mobility / Clean Energy",
    summary:
      "Brian drives B2B market development for enterprise fleet customers evaluating electric motorcycles as commercially practical, cost-efficient, and sustainable mobility solutions.",
    responsibilities: [
      "Drive B2B market development by identifying and engaging logistics companies, ride-hailing services, and fleet operators.",
      "Develop sales strategies focused on cost savings, sustainability, and operational efficiency.",
      "Build relationships with key decision-makers to support long-term partnerships and repeat business.",
      "Forecast sales pipelines and maintain detailed CRM records covering client interactions, contracts, and deal status.",
      "Conduct on-site product demonstrations.",
      "Coordinate onboarding and training for enterprise fleet clients.",
      "Gather market and competitor intelligence to support product and marketing teams.",
      "Contribute to the refinement of go-to-market strategies.",
    ],
    skills: ["Enterprise Sales", "Electric Mobility", "Fleet Solutions", "CRM", "Market Development", "Product Demonstrations", "Client Onboarding"],
    displayOrder: 1,
    isPublished: true,
  },
  {
    organization: "Seeds for Sustainability Europe",
    jobTitle: "Business Development Lead",
    location: "Nairobi, Kenya",
    startDate: "February 2024",
    endDate: "December 2024",
    isCurrent: false,
    sector: "Sustainability / ESG",
    summary:
      "Brian supported B2B pipeline development and commercial outreach for sustainability and ESG-focused offerings, engaging senior stakeholders with structured proposals.",
    responsibilities: [
      "Identified, qualified, and secured prospective B2B accounts through strategic outreach.",
      "Managed end-to-end deal negotiations.",
      "Developed and presented business proposals to senior stakeholders and decision-makers.",
      "Managed the complete customer lifecycle.",
      "Built a structured database of prospective clients to support pipeline development.",
    ],
    skills: ["Sustainability", "ESG", "Business Development", "Pipeline Development", "Proposals", "Negotiation"],
    displayOrder: 2,
    isPublished: true,
  },
  {
    organization: "Jibu Incorporated",
    jobTitle: "Franchise Development Officer",
    location: "Nairobi, Kenya",
    startDate: "February 2022",
    endDate: "August 2023",
    isCurrent: false,
    sector: "Social Enterprise / Water / Franchising",
    summary:
      "Brian advanced franchise growth through customer-base development, team training, operational onboarding, compliance support, and technology adoption.",
    responsibilities: [
      "Led B2B and B2C customer-base development through targeted franchise growth strategies.",
      "Built and managed franchise teams.",
      "Delivered structured training on operating standards.",
      "Designed franchise onboarding, training, and operational-support programmes.",
      "Championed the adoption of Jibu technology platforms.",
      "Conducted hygiene and technology compliance audits.",
    ],
    skills: ["Franchise Development", "Team Training", "Operations", "Compliance", "Customer Growth", "Technology Adoption"],
    displayOrder: 3,
    isPublished: true,
  },
  {
    organization: "Ponea Health",
    jobTitle: "Partnership Acquisition Sales Executive",
    location: "Nairobi, Kenya",
    startDate: "September 2021",
    endDate: "February 2022",
    isCurrent: false,
    sector: "Health Technology",
    summary:
      "Brian helped expand Ponea Health’s B2B partner network by developing healthcare relationships, presenting solutions, negotiating agreements, and maintaining CRM discipline.",
    responsibilities: [
      "Developed strategic partnerships across Kenya’s healthcare sector.",
      "Expanded the company’s B2B partner network.",
      "Conducted product presentations at hospitals and retail locations.",
      "Led negotiations and supported agreement closure.",
      "Maintained CRM records.",
      "Resolved client issues to improve customer satisfaction.",
    ],
    skills: ["Healthcare Partnerships", "Sales Presentations", "CRM", "Negotiation", "Client Success"],
    displayOrder: 4,
    isPublished: true,
  },
  {
    organization: "AMREF Flying Doctors",
    jobTitle: "Business Development Associate",
    location: "Nairobi, Kenya",
    startDate: "October 2020",
    endDate: "August 2021",
    isCurrent: false,
    sector: "Healthcare / Emergency Medical Services",
    summary:
      "Brian identified healthcare partnership opportunities and supported institutional sales through proposals, negotiation, and contract-closure activity.",
    responsibilities: [
      "Identified healthcare partnership opportunities across Kenya.",
      "Expanded the B2B client network.",
      "Led deal negotiations.",
      "Developed proposals.",
      "Supported contract closure with healthcare institutions and retail partners.",
    ],
    skills: ["Healthcare Business Development", "Institutional Sales", "Proposals", "Contract Negotiation"],
    displayOrder: 5,
    isPublished: true,
  },
  {
    organization: "World Wildlife Fund for Nature – Kenya",
    jobTitle: "Public Engagement Assistant",
    location: "Nairobi, Kenya",
    startDate: "November 2018",
    endDate: "November 2019",
    isCurrent: false,
    sector: "Conservation / Non-profit",
    summary:
      "Brian supported conservation fundraising by engaging the public, recruiting individual donors, and developing relationship networks.",
    responsibilities: [
      "Conducted public engagement through face-to-face activations.",
      "Recruited individual donors.",
      "Helped build a sustainable funding base.",
      "Developed relationships with individual donors and organizational partners.",
    ],
    skills: ["Public Engagement", "Donor Acquisition", "Conservation", "Relationship Management"],
    displayOrder: 6,
    isPublished: true,
  },
  {
    organization: "Surf Kenya / Express Wi‑Fi by Facebook",
    jobTitle: "Regional Field Sales Associate",
    location: "Nairobi, Kenya",
    startDate: "February 2017",
    endDate: "May 2018",
    isCurrent: false,
    sector: "Connectivity / Technology",
    summary:
      "Brian recruited and managed SME agents for regional connectivity operations, while building tracking tools and scaling field-sales execution across three Nairobi satellite markets.",
    responsibilities: [
      "Recruited, vetted, trained, and managed SME agents delivering Express Wi‑Fi services.",
      "Expanded the agent network from 18 to 100.",
      "Launched and scaled operations across Ongata Rongai, Kiserian, and Ngong.",
      "Achieved a 90% monthly average revenue result.",
      "Developed CRM and Excel-based performance-tracking tools.",
      "Achieved 100% grant collection.",
      "Maintained zero loan defaults.",
    ],
    skills: ["Regional Sales", "Agent Network Development", "Connectivity", "CRM", "Excel", "Performance Management"],
    displayOrder: 7,
    isPublished: true,
  },
  {
    organization: "SasaPay",
    jobTitle: "Details pending verification",
    location: "Nairobi, Kenya",
    startDate: "Pending verification",
    endDate: null,
    isCurrent: false,
    sector: "Financial Technology",
    summary: "Details pending verification. This record should remain unpublished until Brian confirms the role, dates, scope, and achievements.",
    responsibilities: ["Details pending verification."],
    skills: ["Financial Technology"],
    displayOrder: 90,
    isPublished: false,
  },
  {
    organization: "Peleza",
    jobTitle: "Details pending verification",
    location: "Nairobi, Kenya",
    startDate: "Pending verification",
    endDate: null,
    isCurrent: false,
    sector: "Business Verification / Technology Services",
    summary: "Details pending verification. This record should remain unpublished until Brian confirms the role, dates, scope, and achievements.",
    responsibilities: ["Details pending verification."],
    skills: ["Business Verification", "Technology Services"],
    displayOrder: 91,
    isPublished: false,
  },
  {
    organization: "Byon",
    jobTitle: "Details pending verification",
    location: "Nairobi, Kenya",
    startDate: "Pending verification",
    endDate: null,
    isCurrent: false,
    sector: "Technology-enabled Services",
    summary: "Details pending verification. This record should remain unpublished until Brian confirms the role, dates, scope, and achievements.",
    responsibilities: ["Details pending verification."],
    skills: ["Technology-enabled Services"],
    displayOrder: 92,
    isPublished: false,
  },
];

export const defaultImpactMetrics: ImpactMetricContent[] = [
  { value: "5", suffix: "+", label: "Years of professional experience", context: "Cross-sector B2B sales, business development, partnerships, and market-development experience in Kenya.", displayOrder: 1, isPublished: true },
  { value: "10", label: "Organizations and sector touchpoints", context: "Experience and supplied sector touchpoints across growth-stage companies, institutions, and mission-driven organizations.", displayOrder: 2, isPublished: true },
  { value: "18", suffix: " to 100", label: "SME agent network expansion", context: "Verified Surf Kenya / Express Wi‑Fi by Facebook result; this metric relates specifically to Brian’s regional field-sales role at Surf Kenya.", displayOrder: 3, isPublished: true },
  { value: "90", suffix: "%", label: "Monthly average revenue achieved", context: "Verified Surf Kenya regional operation result; not generalized across all roles.", displayOrder: 4, isPublished: true },
  { value: "100", suffix: "%", label: "Grant collection", context: "Verified Surf Kenya result tied to field-sales operations and agent management.", displayOrder: 5, isPublished: true },
  { value: "0", label: "Loan defaults", context: "Verified Surf Kenya result connected to agent network management and field controls.", displayOrder: 6, isPublished: true },
  { value: "3", label: "Locations launched and scaled", context: "Ongata Rongai, Kiserian, and Ngong during Brian’s Surf Kenya / Express Wi‑Fi by Facebook role.", displayOrder: 7, isPublished: true },
];

export const defaultCaseStudies: CaseStudyContent[] = [
  {
    title: "Scaling an SME Agent Network",
    organization: "Surf Kenya / Express Wi‑Fi by Facebook",
    challenge: "Expand access and grow the regional field-sales network.",
    contribution: "Recruited, vetted, trained, and managed SME agents while building performance-tracking systems.",
    outcome: "Agent network grew from 18 to 100, with operations scaled across Ongata Rongai, Kiserian, and Ngong.",
    displayOrder: 1,
    isPublished: true,
  },
  {
    title: "Supporting Enterprise Electric Mobility Adoption",
    organization: "Roam Electric",
    challenge: "Help enterprise fleet customers evaluate electric motorcycles as commercially viable mobility solutions.",
    contribution:
      "Engaged logistics, ride-hailing, and fleet operators; developed value propositions around cost efficiency, sustainability, and operational performance; coordinated demonstrations and onboarding.",
    outcome: "A structured enterprise-sales contribution supporting customer evaluation, onboarding readiness, and go-to-market refinement. No unverified numerical result is claimed.",
    displayOrder: 2,
    isPublished: true,
  },
  {
    title: "Building Healthcare Partnerships",
    organization: "Ponea Health and AMREF Flying Doctors",
    challenge: "Develop institutional and commercial relationships across the healthcare ecosystem.",
    contribution: "Identified opportunities, conducted presentations, developed proposals, led negotiations, and supported partnership closure.",
    outcome: "Expanded partnership-development activity across healthcare environments. No unverified numerical result is claimed.",
    displayOrder: 3,
    isPublished: true,
  },
];

export const defaultCertifications: CertificationContent[] = [
  { title: "Sustainability (ESG) & CSR Expert", issuer: "Seeds for Sustainability Europe", issueDate: "May 2024", expiryDate: "December 2025", displayOrder: 1, isPublished: true },
  { title: "Introduction to ESG: Environmental, Social and Governance", issuer: "Udemy", issueDate: "June 2024", expiryDate: null, displayOrder: 2, isPublished: true },
  { title: "Be the Manager People Won’t Leave", issuer: "LinkedIn Learning", issueDate: "June 2024", expiryDate: null, displayOrder: 3, isPublished: true },
  { title: "Management Skills", issuer: "Udemy", issueDate: "February – March 2023", expiryDate: null, displayOrder: 4, isPublished: true },
];

export const education = [
  {
    qualification: "Bachelor of Co-operative Business (Finance)",
    institution: "The Co-operative University of Kenya",
    details: "Second Class Honours, Upper Division",
    dates: "2012 – 2016",
  },
  {
    qualification: "Kenya Certificate of Secondary Education",
    institution: "Kakamega School",
    details: "Grade B",
    dates: "2011",
  },
];

export const languages = [
  { language: "English", level: "Fluent" },
  { language: "Swahili", level: "Native" },
];

export const expertisePillars = [
  {
    title: "B2B Sales Strategy",
    slug: "b2b-sales-strategy",
    icon: "line-chart",
    explanation: "I design and execute disciplined sales motions that qualify high-value opportunities, build transparent pipeline visibility, and move your enterprise deals toward closure.",
    skills: ["Full-cycle enterprise sales", "Sales pipeline development", "Sales forecasting", "Prospect qualification", "Deal progression and closure"],
    organizations: ["Roam Electric", "Seeds for Sustainability Europe", "Surf Kenya"],
  },
  {
    title: "Market Expansion",
    slug: "market-expansion",
    icon: "briefcase-business",
    explanation: "I identify untapped market opportunities and convert your target audience's needs into practical, commercial propositions that support sustainable footprint growth.",
    skills: ["Market-entry support", "Opportunity identification", "Customer acquisition", "Revenue-growth planning", "New market development"],
    organizations: ["Seeds for Sustainability Europe", "AMREF Flying Doctors", "Jibu Incorporated"],
  },
  {
    title: "Strategic Partnerships",
    slug: "strategic-partnerships",
    icon: "handshake",
    explanation: "I build long-term stakeholder trust across institutions, enterprises, and complex ecosystems through structured outreach, compelling proposals, and rigorous commercial negotiation.",
    skills: ["Partnership prospecting", "Stakeholder mapping", "Relationship development", "Institutional partnerships", "Commercial negotiations"],
    organizations: ["Ponea Health", "AMREF Flying Doctors", "Roam Electric"],
  },
  {
    title: "Key Account Management",
    slug: "key-account-management",
    icon: "users-round",
    explanation: "I protect and grow your revenue by managing customer relationships far beyond initial acquisition—driving onboarding, issue resolution, and repeat-business discipline.",
    skills: ["Customer lifecycle management", "Client onboarding", "Retention and relationship growth", "Issue resolution", "Repeat-business development"],
    organizations: ["Roam Electric", "Ponea Health", "Seeds for Sustainability Europe"],
  },
  {
    title: "Go-to-Market Execution",
    slug: "go-to-market-execution",
    icon: "target",
    explanation: "I translate high-level strategy into aggressive, on-the-ground market activity through deep competitor intelligence, high-impact product demonstrations, and cross-functional agility.",
    skills: ["Customer research", "Competitor intelligence", "Product demonstrations", "Market positioning", "Cross-functional collaboration"],
    organizations: ["Roam Electric", "Jibu Incorporated", "Surf Kenya"],
  },
  {
    title: "Network Development",
    slug: "network-development",
    icon: "network",
    explanation: "I build, train, and enable highly effective distributed teams, franchise operators, and agent networks with strict operational standards and performance-tracking frameworks.",
    skills: ["Franchise development", "Agent recruitment", "Team training", "Operational onboarding", "Performance management"],
    organizations: ["Jibu Incorporated", "Surf Kenya / Express Wi‑Fi by Facebook", "WWF Kenya"],
  },
];

export const sectors = [
  {
    title: "Electric mobility and clean energy",
    description: "I drive enterprise fleet sales and position cost-efficiency models to accelerate the commercial adoption of sustainable mobility solutions.",
  },
  {
    title: "Healthcare and health technology",
    description: "I build robust institutional relationships, negotiate high-value contracts, and streamline CRM disciplines across the healthcare ecosystem.",
  },
  {
    title: "Sustainability and ESG",
    description: "I educate stakeholders and develop structured B2B pipelines for responsible-business and ESG-focused technology services.",
  },
  {
    title: "Water and social enterprise",
    description: "I scale franchise networks by enforcing strict operating standards, optimizing technology adoption, and leading comprehensive team training.",
  },
  {
    title: "Conservation and non-profit fundraising",
    description: "I clearly communicate mission value to establish and grow long-lasting donor relationships and institutional funding partnerships.",
  },
  {
    title: "Connectivity and telecommunications",
    description: "I have verified experience launching regional operations, recruiting agent networks, and executing aggressive field-sales strategies.",
  },
  {
    title: "Financial technology",
    description: "Financial-technology exposure is listed as a sector touchpoint; specific roles, dates, and achievements must be verified before publication.",
  },
  {
    title: "Business verification and technology services",
    description: "Technology-enabled services are presented as transferable commercial environments; unverified organization-specific claims are intentionally excluded.",
  },
];

export const inquiryTypes = [
  "Employment opportunity",
  "Strategic partnership",
  "Consulting engagement",
  "Speaking or event invitation",
  "General inquiry",
] as const;

export const defaultSiteSettings = {
  publicEmail: publicContact.email,
  publicPhone: publicContact.phone,
  linkedInUrl: publicContact.linkedIn,
  location: publicContact.location,
  cvUrl: publicContact.cvPath,
  portraitUrl: "/Brian.jpeg",
};
