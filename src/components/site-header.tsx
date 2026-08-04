"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { publicContact } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/expertise", label: "Expertise" },
  { href: "/impact", label: "Impact" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition",
        scrolled ? "border-black/5 bg-[#fafafa]/95 shadow-sm backdrop-blur" : "border-transparent bg-[#fafafa]/90 backdrop-blur",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <Link href="/" className="group flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111]">
          <span className="grid size-11 place-items-center rounded-full bg-[#111] text-sm font-display font-bold tracking-wide text-white shadow-sm transition group-hover:bg-[#333]">BB</span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-bold text-[#111]">Brian M. Burudi</span>
            <span className="block text-xs font-medium text-[#555]">B2B Sales & Expansion</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold text-[#555] transition hover:bg-black/5 hover:text-[#111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
                  active && "bg-black/5 text-[#111] shadow-sm ring-1 ring-black/10 after:ml-2 after:text-[#111] after:content-['•']",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <ButtonLink href={publicContact.cvPath} variant="primary" download>
            Download CV
          </ButtonLink>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-black/10 bg-transparent text-[#111] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      {open ? (
        <div id="mobile-navigation" className="border-t border-black/5 bg-[#ffffff] px-4 py-4 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2" role="menu">
            {navItems.map((item, index) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  role="menuitem"
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-base font-semibold text-[#555] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]",
                    active ? "bg-black/5 text-[#111]" : "hover:bg-black/5 hover:text-[#111]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <ButtonLink href={publicContact.cvPath} variant="primary" className="mt-2 w-full" download>
              Download CV
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
