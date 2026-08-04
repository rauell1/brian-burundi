"use server";

import { redirect } from "next/navigation";
import { ensureConfiguredAdmin, isConfiguredPassword, setAdminSession } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

export async function loginAction(_previousState: { error?: string } | undefined, formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors.email?.[0] ?? parsed.error.flatten().fieldErrors.password?.[0] ?? "Invalid login details." };
  }

  if (!isConfiguredPassword(parsed.data.password)) {
    return { error: "Invalid administrator credentials." };
  }

  try {
    const admin = await ensureConfiguredAdmin(parsed.data.email);
    if (!admin) return { error: "Invalid administrator credentials." };

    await setAdminSession({ email: admin.email, name: admin.name, role: admin.role });
  } catch {
    return { error: "Admin login is not configured yet. Check database and environment variables." };
  }

  redirect("/admin");
}
