import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { rateLimit } from "@/lib/rate-limit";
import { contactFormSchema } from "@/lib/validators";

function getClientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);

  if (!limit.allowed) {
    return NextResponse.json({ ok: false, message: "Too many submissions. Please try again later." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please review the highlighted fields and try again.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.website) {
    return NextResponse.json({ ok: true, message: "Thank you. Your message has been received." });
  }

  try {
    await db.insert(contactSubmissions).values({
      fullName: data.fullName,
      email: data.email,
      organization: data.organization,
      phone: data.phone || null,
      inquiryType: data.inquiryType,
      message: data.message,
      consent: data.consent,
      status: "new",
    });

    if (process.env.RESEND_API_KEY && process.env.CONTACT_NOTIFICATION_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: process.env.CONTACT_NOTIFICATION_EMAIL,
        subject: `Portfolio inquiry: ${data.inquiryType}`,
        text: `New inquiry from ${data.fullName} (${data.email}) at ${data.organization}.\n\nTelephone: ${data.phone || "Not provided"}\nInquiry type: ${data.inquiryType}\n\nMessage:\n${data.message}`,
        replyTo: data.email,
      });
    }

    return NextResponse.json({ ok: true, message: "Thank you. Your message has been received." });
  } catch {
    return NextResponse.json(
      { ok: false, message: "The message could not be sent right now. Please email Brian directly." },
      { status: 500 },
    );
  }
}
