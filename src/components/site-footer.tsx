import Link from "next/link";
import { ExternalLink, Mail, MapPin } from "lucide-react";
import { publicContact } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 bg-[#fafafa] text-[#111]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-display font-bold">Brian M. Burudi</p>
          <p className="mt-1 text-sm text-[#555]">B2B Sales & Expansion</p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#555]">Building commercially strong partnerships for sustainable growth.</p>
        </div>
        <div className="grid gap-3 text-sm text-[#555] sm:grid-cols-2 lg:justify-items-end">
          <span className="inline-flex items-center gap-2"><MapPin size={16} aria-hidden="true" /> Nairobi, Kenya</span>
          <a className="inline-flex items-center gap-2 hover:text-[#111]" href={`mailto:${publicContact.email}`}><Mail size={16} aria-hidden="true" /> Email</a>
          <a className="inline-flex items-center gap-2 hover:text-[#111]" href={publicContact.linkedIn} target="_blank" rel="noreferrer"><ExternalLink size={16} aria-hidden="true" /> LinkedIn</a>
          <a className="hover:text-[#111]" href={publicContact.cvPath} download>Download CV</a>
          <Link className="hover:text-[#111]" href="/privacy">Privacy</Link>
          <span>© {year}</span>
        </div>
      </div>
    </footer>
  );
}
