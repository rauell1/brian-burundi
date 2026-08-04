export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDateRange(startDate: string, endDate: string | null | undefined, isCurrent = false) {
  return `${startDate} – ${isCurrent ? "Present" : endDate ?? "Present"}`;
}

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}
