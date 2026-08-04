import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full border border-[#DDE3E9] bg-[#F7F8FA] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#174A7E]", className)} {...props} />;
}
