import nodemailer from "nodemailer";
import logger from "./logger.js";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server address
    port: 587,
    secure: false,
    auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.FROM_PASSWORD,
    },
});
export const sendMail = async (to, subject, html) => {
    // send mail with defined transport object
    try {
        await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: to, // list of receivers
            subject: subject,
            html: html,
        });
    }
    catch (error) {
        logger.error({ type: "Email Error", error });
    }
};
