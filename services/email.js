import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendEmail = async (to, subject, text) => { 
    try {
        const emailData = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        };

        const result = await transporter.sendMail(emailData);
        return result;
    } catch (err) {
        console.error('Error sending email: ' , err);
    }
}