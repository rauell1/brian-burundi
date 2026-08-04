import { publicContact, organizationNames } from "@/lib/content";
import { siteUrl } from "@/lib/utils";

export function PersonStructuredData() {
  const baseUrl = siteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: publicContact.name,
    jobTitle: "B2B Sales Lead",
    description:
      "Nairobi-based B2B sales, business development, strategic partnerships, and market expansion professional.",
    url: baseUrl,
    image: `${baseUrl}/Brian.jpeg`,
    email: publicContact.email,
    telephone: publicContact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    sameAs: [publicContact.linkedIn],
    knowsAbout: [
      "B2B Sales",
      "Business Development",
      "Strategic Partnerships",
      "Market Expansion",
      "Key Account Management",
      "Sustainability",
      "Electric Mobility",
      "Healthcare Partnerships",
    ],
    worksFor: organizationNames.map((name) => ({ "@type": "Organization", name })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function ProfilePageStructuredData() {
  const baseUrl = siteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Brian M. Burudi professional portfolio",
    url: baseUrl,
    mainEntity: {
      "@type": "Person",
      name: publicContact.name,
      jobTitle: "B2B Sales Lead",
      url: baseUrl,
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; path: string }> }) {
  const baseUrl = siteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
