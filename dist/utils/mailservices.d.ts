declare class EmailService {
    private transporter;
    constructor();
    sendMail({ to, subject, html, }: {
        to: string;
        subject: string;
        html: string;
    }): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
declare const _default: EmailService;
export default _default;
//# sourceMappingURL=mailservices.d.ts.map