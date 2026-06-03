import nodemailer from "nodemailer";

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail", // replace with SMTP config if needed
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
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
        from: `"Noble Restaurant" <${process.env.EMAIL_USER}>`,
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
