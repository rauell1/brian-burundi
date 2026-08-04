import type { InputHTMLAttributes, LabelHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-semibold text-[#16202A]", className)} {...props} />;
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("min-h-11 w-full rounded-2xl border border-[#DDE3E9] bg-white px-4 py-2 text-sm text-[#16202A] outline-none transition placeholder:text-[#7A8490] focus:border-[#174A7E] focus:ring-4 focus:ring-[#174A7E]/10", className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("min-h-32 w-full rounded-2xl border border-[#DDE3E9] bg-white px-4 py-3 text-sm text-[#16202A] outline-none transition placeholder:text-[#7A8490] focus:border-[#174A7E] focus:ring-4 focus:ring-[#174A7E]/10", className)} {...props} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn("min-h-11 w-full rounded-2xl border border-[#DDE3E9] bg-white px-4 py-2 text-sm text-[#16202A] outline-none transition focus:border-[#174A7E] focus:ring-4 focus:ring-[#174A7E]/10", className)} {...props} />;
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm font-medium text-red-700">{message}</p>;
}
