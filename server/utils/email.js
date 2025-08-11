const sgMail = require("@sendgrid/mail");

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail({ to, subject, text, html }) {
  try {
    // Validate required environment variables
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY is not set in environment variables");
    }

    if (!process.env.SENDGRID_FROM_EMAIL) {
      throw new Error(
        "SENDGRID_FROM_EMAIL is not set in environment variables"
      );
    }

    const msg = {
      to,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: "Online Exam Portal",
      },
      subject,
      text,
      html,
      // Improve deliverability settings
      trackingSettings: {
        clickTracking: {
          enable: false,
          enableText: false,
        },
        openTracking: {
          enable: false,
        },
        subscriptionTracking: {
          enable: false,
        },
      },
      // Add headers to improve deliverability
      headers: {
        "X-Priority": "3", // Normal priority
        "X-MSMail-Priority": "Normal",
        Importance: "normal",
        "X-Mailer": "Online Exam Portal",
        "List-Unsubscribe": `<mailto:${process.env.SENDGRID_FROM_EMAIL}?subject=unsubscribe>`,
      },
      // Add categories for better tracking
      categories: ["verification", "exam-portal"],
    };

    const response = await sgMail.send(msg);
    console.log("Email sent successfully via SendGrid");
    console.log("Message ID:", response[0].headers["x-message-id"]);
    console.log("To:", to);
    console.log("From:", process.env.SENDGRID_FROM_EMAIL);
    return true;
  } catch (error) {
    console.error("SendGrid email sending failed:", error);
    if (error.response) {
      console.error("SendGrid Error Details:", error.response.body);
    }
    return false;
  }
}

module.exports = { sendEmail };
