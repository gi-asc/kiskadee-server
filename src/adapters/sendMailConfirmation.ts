import { ISendMailConfirmation } from './ISendMailConfirmation';
import { config } from 'dotenv';
config();
import * as nodemailer from 'nodemailer';

export class SendEmailConfirmation implements ISendMailConfirmation {
    async sendMail(to: string, message: string): Promise<void> {
        let mailOptions = {
            from: process.env.MAIL_USER,
            to: to,
            subject: 'Confirmação cadastro',
            html: message,
        };

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            port: 465,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
            tls: {
                ciphers: 'SSLv3',
            },
        });

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return error;
            } else {
                return 'E-mail enviado com sucesso!';
            }
        });
    }
}
