"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailService {
    transporter;
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            connectionTimeout: 15000,
            greetingTimeout: 15000,
            socketTimeout: 15000,
        });
    }
    async sendMail({ to, subject, html, }) {
        try {
            const info = await this.transporter.sendMail({
                from: `"Noble Restaurant" <${process.env.EMAIL_USER}>`,
                to,
                subject,
                html,
            });
            console.log("Email sent:", info.messageId);
            return info;
        }
        catch (error) {
            console.log("Email error:", error);
            throw error;
        }
    }
}
exports.default = new EmailService();
//# sourceMappingURL=mailservices.js.map