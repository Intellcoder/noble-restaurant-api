import { BrevoClient } from "@getbrevo/brevo";

const brevo = new BrevoClient({ apiKey: process.env.BREVO_API_KEY! });

export class EmailService {
  static async sendMail({
    to,
    subject,
    html,
    sender,
  }: {
    to: [
      {
        email: string;
        name: string;
      },
    ];
    subject: string;
    html: string;
    sender: {
      name: string;
      email: string;
    };
  }) {
    try {
      const sendSmtpEmail = await brevo.transactionalEmails.sendTransacEmail({
        subject: subject,
        htmlContent: html,
        sender: sender,
        to: to,
      });

      console.log("Email sent. message ID", sendSmtpEmail.messageId);
    } catch (error) {
      console.log("SMTP Error:", error);
    }
  }
}
