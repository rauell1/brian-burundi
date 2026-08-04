"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/ui/submit-button";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/forms";
import { loginAction } from "./actions";

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, undefined);

  return (
    <Card className="mx-auto max-w-md">
      <CardContent className="pt-6">
        <h1 className="text-2xl font-bold text-[#0B1F33]">Administrator login</h1>
        <p className="mt-2 text-sm leading-6 text-[#5D6875]">Access is restricted. There is no public sign-up.</p>
        <form action={formAction} className="mt-6 space-y-5">
          <div>
            <Label htmlFor="email">Admin email</Label>
            <Input id="email" name="email" type="email" autoComplete="username" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>
          {state?.error ? <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-800" role="alert">{state.error}</p> : null}
          <SubmitButton>Sign in securely</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
