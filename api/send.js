const EMAIL_TO = "Meaneatanganaowona@gmail.com";
const FROM_NAME = "Looking2FlyyByMKash";

function buildHtml({ name, email, phone, subject, message }) {
  const fields = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Subject", subject],
    ["Message", message],
  ];
  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;font-weight:700;color:#ff4faf;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:8px 0;color:#e2dde0">${value}</td></tr>`
    )
    .join("");
  return `<!DOCTYPE html><html><body style="margin:0;padding:32px;background:#0e0b0e;font-family:system-ui,sans-serif">
<div style="max-width:560px;margin:0 auto;border:1px solid rgba(255,79,175,0.15);border-radius:20px;padding:28px 32px;background:linear-gradient(165deg,rgba(250,246,248,0.04),rgba(255,79,175,0.02))">
<h2 style="margin:0 0 20px;font-family:Georgia,serif;font-size:1.6rem;color:#ffc1dc;letter-spacing:-.01em">New Contact Message</h2>
<table style="width:100%;border-collapse:collapse;font-size:0.92rem;line-height:1.6">${rows}</table>
<hr style="margin:20px 0;border:0;border-top:1px solid rgba(255,79,175,0.1)">
<p style="margin:0;color:rgba(250,246,248,0.35);font-size:0.78rem">Sent via Looking2FlyyByMKash contact form</p>
</div></body></html>`;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, subject, message, _honeypot } = req.body || {};

  if (_honeypot) {
    return res.status(200).json({ success: true });
  }

  const missing = [];
  if (!name?.trim()) missing.push("Name");
  if (!email?.trim()) missing.push("Email");
  if (!subject?.trim()) missing.push("Subject");
  if (!message?.trim()) missing.push("Message");

  if (missing.length) {
    return res.status(400).json({ error: `Required: ${missing.join(", ")}` });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  if (name.trim().length > 100 || subject.trim().length > 200 || message.trim().length > 5000) {
    return res.status(400).json({ error: "One or more fields exceed the maximum length." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY environment variable");
    return res.status(500).json({ error: "Server configuration error. Please try again later." });
  }

  const payload = {
    from: `${FROM_NAME} <onboarding@resend.dev>`,
    to: EMAIL_TO,
    reply_to: email.trim(),
    subject: `${FROM_NAME} — ${subject.trim()}`,
    html: buildHtml({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim(),
      subject: subject.trim(),
      message: message.trim(),
    }),
  };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Resend API error:", response.status, errText);
      return res.status(500).json({ error: "Failed to send message. Please try again later." });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Resend fetch error:", err);
    return res.status(500).json({ error: "Network error. Please try again." });
  }
}
