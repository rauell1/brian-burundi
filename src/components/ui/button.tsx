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
  primary: "bg-[#fff] text-[#000] hover:bg-[#e0e0e0] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]",
  secondary: "bg-[#222] text-white border border-white/10 hover:bg-[#333] hover:border-white/30",
  outline: "border border-white/20 bg-transparent text-white hover:border-white/80 hover:bg-white/5",
  ghost: "text-[#888] hover:bg-white/5 hover:text-white",
  gold: "bg-white text-black hover:bg-[#e0e0e0]",
};

const base =
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fff] disabled:pointer-events-none disabled:opacity-50";

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
