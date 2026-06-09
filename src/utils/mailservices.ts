import nodemailer from "nodemailer";

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.BREVO_SMTP_LOGIN,
        pass: process.env.BREVO_SMTP_KEY,
      },

      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
    });
  }

  async sendMail({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }) {
    try {
      const info = await this.transporter.sendMail({
        from: `${process.env.EMAIL_USER}`,
        to,
        subject,
        html,
      });

      console.log("Email sent:", info.messageId);

      return info;
    } catch (error) {
      console.log("Email error:", error);
      throw error;
    }
  }
}

export default new EmailService();
