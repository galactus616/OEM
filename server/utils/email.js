const nodemailer = require("nodemailer");

let transporterInstance = null;

const getTransporter = async () => {
  if (transporterInstance) return transporterInstance;

  const host = process.env.SMTP_HOST || "";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true"; // false for STARTTLS on 587
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";

  if (!host) {
    throw new Error("SMTP_HOST not set. Configure Brevo SMTP env vars.");
  }

  transporterInstance = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  });

  return transporterInstance;
};

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = await getTransporter();
    const from = process.env.FROM_EMAIL || "no-reply@example.com";

    const info = await transporter.sendMail({ from, to, subject, html, text });
    if (info?.messageId) {
      console.log(`[email] Sent: ${subject} → ${to} (id: ${info.messageId})`);
    } else {
      console.log(`[email] Sent: ${subject} → ${to}`);
    }
    return true;
  } catch (err) {
    console.error("[email] Send failed:", err.message);
    return false;
  }
};

module.exports = { sendEmail };
