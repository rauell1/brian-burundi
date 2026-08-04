"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function SubmitButton({ children, pendingText = "Saving...", variant = "primary" }: { children: string; pendingText?: string; variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} variant={variant}>
      {pending ? pendingText : children}
    </Button>
  );
}
