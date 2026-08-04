"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/forms";
import { inquiryTypes } from "@/lib/content";
import { contactFormSchema } from "@/lib/validators";

type Errors = Partial<Record<keyof z.infer<typeof contactFormSchema>, string>>;

const initialValues = {
  fullName: "",
  email: "",
  organization: "",
  phone: "",
  inquiryType: "General inquiry",
  message: "",
  consent: false,
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ ok?: boolean; message: string }>({ message: "" });
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ message: "" });
    setErrors({});

    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0] ?? "Please review this field."])) as Errors);
      setStatus({ ok: false, message: "Please review the highlighted fields." });
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json()) as { ok: boolean; message: string; errors?: Record<string, string[]> };
      if (!response.ok || !result.ok) {
        setErrors(Object.fromEntries(Object.entries(result.errors ?? {}).map(([key, value]) => [key, value?.[0] ?? "Please review this field."])) as Errors);
        setStatus({ ok: false, message: result.message || "The message could not be sent." });
        return;
      }
      setValues(initialValues);
      setStatus({ ok: true, message: result.message });
    } catch {
      setStatus({ ok: false, message: "The message could not be sent right now. Please email Brian directly." });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="website">Website</Label>
        <Input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => setValues({ ...values, website: event.target.value })} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" name="fullName" autoComplete="name" value={values.fullName} aria-invalid={Boolean(errors.fullName)} aria-describedby="fullName-error" onChange={(event) => setValues({ ...values, fullName: event.target.value })} />
          <FieldError message={errors.fullName} />
        </div>
        <div>
          <Label htmlFor="email">Work email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" value={values.email} aria-invalid={Boolean(errors.email)} aria-describedby="email-error" onChange={(event) => setValues({ ...values, email: event.target.value })} />
          <FieldError message={errors.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="organization">Organization</Label>
          <Input id="organization" name="organization" autoComplete="organization" value={values.organization} aria-invalid={Boolean(errors.organization)} onChange={(event) => setValues({ ...values, organization: event.target.value })} />
          <FieldError message={errors.organization} />
        </div>
        <div>
          <Label htmlFor="phone">Telephone <span className="font-normal text-[#5D6875]">optional</span></Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} aria-invalid={Boolean(errors.phone)} onChange={(event) => setValues({ ...values, phone: event.target.value })} />
          <FieldError message={errors.phone} />
        </div>
      </div>

      <div>
        <Label htmlFor="inquiryType">Inquiry type</Label>
        <Select id="inquiryType" name="inquiryType" value={values.inquiryType} aria-invalid={Boolean(errors.inquiryType)} onChange={(event) => setValues({ ...values, inquiryType: event.target.value })}>
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Select>
        <FieldError message={errors.inquiryType} />
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" value={values.message} aria-invalid={Boolean(errors.message)} onChange={(event) => setValues({ ...values, message: event.target.value })} placeholder="Share the opportunity, context, timing, and best next step." />
        <FieldError message={errors.message} />
      </div>

      <div className="rounded-2xl border border-[#DDE3E9] bg-[#F7F8FA] p-4">
        <label className="flex gap-3 text-sm leading-6 text-[#5D6875]">
          <input type="checkbox" className="mt-1 size-4 rounded border-[#DDE3E9] accent-[#174A7E]" checked={values.consent} onChange={(event) => setValues({ ...values, consent: event.target.checked })} />
          <span>I consent to Brian storing and using my submitted information to respond to this inquiry. I understand I can request deletion of this information.</span>
        </label>
        <FieldError message={errors.consent} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={pending}>{pending ? "Sending..." : "Send message"}</Button>
        <p className="text-sm text-[#5D6875]">Prefer email? Use the direct contact links beside the form.</p>
      </div>

      <div aria-live="polite" className={status.message ? `rounded-2xl p-4 text-sm font-semibold ${status.ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}` : "sr-only"}>
        {status.message || "Form status"}
      </div>
    </form>
  );
}
