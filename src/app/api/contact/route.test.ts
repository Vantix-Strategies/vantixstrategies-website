import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// The route builds a transport at request time; capture what it tries to send.
const sendMail = vi.fn();
const createTransport = vi.fn(() => ({ sendMail }));

vi.mock("nodemailer", () => ({
  default: { createTransport },
}));

const VALID_BODY = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines Ltd",
  engagementArea: "AI Orchestration",
  message: "We would like to talk about a pilot.",
};

const RECIPIENT = "hello@vantix.test";

/**
 * CONTACT_TO_EMAIL is read at module scope, so the module has to be re-imported
 * after the env is stubbed rather than imported once at the top of the file.
 */
async function loadRoute() {
  vi.resetModules();
  const mod = await import("./route");
  return mod.POST;
}

function request(body: unknown) {
  return new Request("https://www.vantixstrategies.com/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

/** The happy-path SMTP config: sender and recipient are different mailboxes. */
function stubWorkingSmtp() {
  vi.stubEnv("CONTACT_TO_EMAIL", RECIPIENT);
  vi.stubEnv("SMTP_HOST", "smtp.vantix.test");
  vi.stubEnv("SMTP_PORT", "587");
  vi.stubEnv("SMTP_USER", "mailer@vantix.test");
  vi.stubEnv("SMTP_PASS", "hunter2");
  vi.stubEnv("SMTP_FROM", "no-reply@vantix.test");
}

beforeEach(() => {
  sendMail.mockReset().mockResolvedValue({ messageId: "test" });
  createTransport.mockClear();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("POST /api/contact — validation", () => {
  it.each(["name", "email", "company", "engagementArea", "message"])(
    "rejects a submission missing %s",
    async (field) => {
      stubWorkingSmtp();
      const POST = await loadRoute();

      const res = await POST(request({ ...VALID_BODY, [field]: "" }));

      expect(res.status).toBe(400);
      await expect(res.json()).resolves.toEqual({
        error: "Please complete all required fields.",
      });
      expect(sendMail).not.toHaveBeenCalled();
    },
  );

  it("treats whitespace-only fields as missing", async () => {
    stubWorkingSmtp();
    const POST = await loadRoute();

    const res = await POST(request({ ...VALID_BODY, message: "   " }));

    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("returns 500 without leaking details when the body is not JSON", async () => {
    stubWorkingSmtp();
    const POST = await loadRoute();

    const res = await POST(
      new Request("https://www.vantixstrategies.com/api/contact", {
        method: "POST",
        body: "not json",
      }),
    );

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      error: "Unable to send message. Please try again.",
    });
  });
});

describe("POST /api/contact — SMTP configuration", () => {
  it("returns 500 when SMTP is not configured", async () => {
    vi.stubEnv("CONTACT_TO_EMAIL", RECIPIENT);
    vi.stubEnv("SMTP_HOST", "");
    vi.stubEnv("SMTP_USER", "");
    vi.stubEnv("SMTP_PASS", "");
    const POST = await loadRoute();

    const res = await POST(request(VALID_BODY));

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      error: "Email is not configured on the server yet.",
    });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("refuses to send when the sender would equal the recipient", async () => {
    // Guards against the smtp-from secret being set to CONTACT_TO_EMAIL, which
    // most providers reject as a loopback send.
    vi.stubEnv("CONTACT_TO_EMAIL", RECIPIENT);
    vi.stubEnv("SMTP_HOST", "smtp.vantix.test");
    vi.stubEnv("SMTP_USER", RECIPIENT);
    vi.stubEnv("SMTP_PASS", "hunter2");
    const POST = await loadRoute();

    const res = await POST(request(VALID_BODY));

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toMatchObject({
      error: expect.stringContaining("must be different from recipient"),
    });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("falls back to SMTP_USER when SMTP_FROM collides with the recipient", async () => {
    vi.stubEnv("CONTACT_TO_EMAIL", RECIPIENT);
    vi.stubEnv("SMTP_HOST", "smtp.vantix.test");
    vi.stubEnv("SMTP_USER", "mailer@vantix.test");
    vi.stubEnv("SMTP_PASS", "hunter2");
    vi.stubEnv("SMTP_FROM", RECIPIENT);
    const POST = await loadRoute();

    const res = await POST(request(VALID_BODY));

    expect(res.status).toBe(200);
    expect(sendMail.mock.calls[0][0].from).toBe(
      "Vantix Website <mailer@vantix.test>",
    );
  });

  it("uses implicit TLS on port 465 only", async () => {
    stubWorkingSmtp();
    vi.stubEnv("SMTP_PORT", "465");
    const POST = await loadRoute();

    await POST(request(VALID_BODY));

    expect(createTransport).toHaveBeenCalledWith(
      expect.objectContaining({ port: 465, secure: true }),
    );
  });
});

describe("POST /api/contact — delivery", () => {
  it("sends the submission to the configured recipient", async () => {
    stubWorkingSmtp();
    const POST = await loadRoute();

    const res = await POST(request(VALID_BODY));

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });

    const mail = sendMail.mock.calls[0][0];
    expect(mail.to).toBe(RECIPIENT);
    expect(mail.from).toBe("Vantix Website <no-reply@vantix.test>");
    // replyTo is what makes "Reply" in the inbox go to the prospect.
    expect(mail.replyTo).toBe(VALID_BODY.email);
    expect(mail.subject).toContain(VALID_BODY.name);
    expect(mail.text).toContain(VALID_BODY.company);
  });

  it("escapes user input in the HTML body", async () => {
    stubWorkingSmtp();
    const POST = await loadRoute();

    await POST(
      request({ ...VALID_BODY, message: `<script>alert("xss")</script>` }),
    );

    const { html } = sendMail.mock.calls[0][0];
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&quot;xss&quot;");
  });

  it("returns 500 when the SMTP transport throws", async () => {
    stubWorkingSmtp();
    sendMail.mockRejectedValueOnce(new Error("connection refused"));
    const POST = await loadRoute();

    const res = await POST(request(VALID_BODY));

    expect(res.status).toBe(500);
    // The underlying SMTP error must not reach the browser.
    await expect(res.json()).resolves.toEqual({
      error: "Unable to send message. Please try again.",
    });
  });
});
