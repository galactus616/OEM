function verificationEmailTemplate({ code, userName }) {
  const safeName = userName ? String(userName).split(" ")[0] : "there";
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f9fc;padding:24px;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e6ecf1;">
      <div style="background:#0f172a;color:#ffffff;padding:16px 20px;">
        <h2 style="margin:0;font-size:18px;">Online Examination Portal</h2>
      </div>
      <div style="padding:20px 24px;">
        <p style="margin:0 0 12px 0;color:#0f172a;">Hi ${safeName},</p>
        <p style="margin:0 0 12px 0;color:#334155;">Use the following verification code to confirm your email address. The code expires in <b>10 minutes</b>.</p>
        <div style="text-align:center;margin:24px 0;">
          <div style="display:inline-block;border:1px dashed #94a3b8;border-radius:8px;padding:12px 16px;background:#f8fafc;">
            <span style="font-size:24px;letter-spacing:4px;font-weight:700;color:#0f172a;">${code}</span>
          </div>
        </div>
        <p style="margin:0 0 12px 0;color:#64748b;">If you didn't request this, you can safely ignore this email.</p>
      </div>
      <div style="padding:14px 20px;background:#f1f5f9;color:#475569;font-size:12px;">
        <p style="margin:0;">© ${new Date().getFullYear()} Online Examination Portal</p>
      </div>
    </div>
  </div>`;
}

module.exports = { verificationEmailTemplate };
