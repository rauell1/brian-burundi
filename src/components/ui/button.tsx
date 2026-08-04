import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "gold";

type SharedProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

const variants: Record<Variant, string> = {
  primary: "bg-[#0B1F33] text-white shadow-sm hover:bg-[#174A7E]",
  secondary: "bg-[#16847A] text-white shadow-sm hover:bg-[#126c64]",
  outline: "border border-[#DDE3E9] bg-white text-[#0B1F33] hover:border-[#174A7E] hover:bg-[#F7F8FA]",
  ghost: "text-[#0B1F33] hover:bg-[#EEF3F7]",
  gold: "bg-[#C9983C] text-[#0B1F33] shadow-sm hover:bg-[#d6aa54]",
};

const base =
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9983C] disabled:pointer-events-none disabled:opacity-50";

export function Button({ variant = "primary", className, ...props }: SharedProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <MagneticWrapper className="inline-block">
      <button className={cn(base, variants[variant], className)} {...props} />
    </MagneticWrapper>
  );
}

export function ButtonLink({ variant = "primary", className, href, ...props }: SharedProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const isExternal = href.startsWith("http");
  return (
    <MagneticWrapper className="inline-block">
      {isExternal ? (
        <a className={cn(base, variants[variant], className)} href={href} target="_blank" rel="noreferrer" {...props} />
      ) : (
        <Link className={cn(base, variants[variant], className)} href={href} {...props} />
      )}
    </MagneticWrapper>
  );
}
