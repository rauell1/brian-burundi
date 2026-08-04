"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function ConfirmButton({ children, message }: { children: string; message: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="outline"
      disabled={pending}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
      className="border-red-200 text-red-700 hover:border-red-400 hover:bg-red-50"
    >
      {pending ? "Deleting..." : children}
    </Button>
  );
}
