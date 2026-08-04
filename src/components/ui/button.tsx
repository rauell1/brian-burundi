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
  primary: "bg-[#111] text-[#fff] hover:bg-[#333] hover:shadow-[0_0_15px_rgba(0,0,0,0.15)]",
  secondary: "bg-[#f2f2f2] text-[#111] border border-black/5 hover:bg-[#e0e0e0] hover:border-black/10",
  outline: "border border-black/20 bg-transparent text-[#111] hover:border-black/80 hover:bg-black/5",
  ghost: "text-[#555] hover:bg-black/5 hover:text-[#111]",
  gold: "bg-[#111] text-white hover:bg-[#333]",
};

const base =
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111] disabled:pointer-events-none disabled:opacity-50";

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
