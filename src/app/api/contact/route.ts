import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  engagementArea?: string;
  message?: string;
};

const RECIPIENT_EMAIL = process.env.CONTACT_TO_EMAIL || "hello@vantixstrategies.com";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;

    const name = body.name?.trim() || "";
    const email = body.email?.trim() || "";
    const company = body.company?.trim() || "";
    const engagementArea = body.engagementArea?.trim() || "";
    const message = body.message?.trim() || "";

    if (!name || !email || !company || !engagementArea || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM?.trim();

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json(
        { error: "Email is not configured on the server yet." },
        { status: 500 }
      );
    }

    const recipientEmail = RECIPIENT_EMAIL.trim();
    let senderEmail = (smtpFrom || smtpUser).trim();

    if (
      senderEmail.toLowerCase() === recipientEmail.toLowerCase() &&
      smtpUser.trim().toLowerCase() !== recipientEmail.toLowerCase()
    ) {
      senderEmail = smtpUser.trim();
    }

    if (senderEmail.toLowerCase() === recipientEmail.toLowerCase()) {
      return NextResponse.json(
        {
          error:
            "Email sender must be different from recipient. Set SMTP_FROM to a different address.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `Vantix Website <${senderEmail}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `New contact form inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Work Email: ${email}`,
        `Company: ${company}`,
        `Engagement Area: ${engagementArea}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <h2>New Contact Form Inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Work Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        <p><strong>Engagement Area:</strong> ${escapeHtml(engagementArea)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send message. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
