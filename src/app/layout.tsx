import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PersonStructuredData, ProfilePageStructuredData } from "@/components/structured-data";
import { siteUrl } from "@/lib/utils";
import { SmoothScroller } from "@/components/ui/smooth-scroller";
import { CustomCursor } from "@/components/ui/custom-cursor";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

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
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#F7F8FA] font-sans text-[#16202A] antialiased">
        <SmoothScroller>
          <CustomCursor />
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <PersonStructuredData />
          <ProfilePageStructuredData />
          <SiteHeader />
          <div id="main-content">{children}</div>
          <SiteFooter />
        </SmoothScroller>
      </body>
    </html>
  );
}
