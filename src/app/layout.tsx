import type { Metadata } from "next";
import { DM_Sans, Geist } from "next/font/google";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PersonStructuredData, ProfilePageStructuredData } from "@/components/structured-data";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

const title = "Brian M. Burudi | B2B Sales, Business Development & Strategic Partnerships";
const description =
  "Brian M. Burudi is a Nairobi-based B2B Sales Lead specializing in business development, strategic partnerships, market expansion, key account management, and sustainable commercial growth.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: title,
    template: "%s | Brian M. Burudi",
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    title,
    description,
    url: "/",
    siteName: "Brian M. Burudi Portfolio",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${dmSans.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#F7F8FA] font-sans text-[#16202A] antialiased">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <PersonStructuredData />
        <ProfilePageStructuredData />
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
