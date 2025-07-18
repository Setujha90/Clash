import nodemailer from 'nodemailer';
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server address
    port: 587,
    secure: false, //true for 465, false for other ports
    auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.FROM_PASSWORD,
    },
});
export const sendEmail = async (to, subject, body) => {
    await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: to,
        subject: subject,
        html: body,
    });
};
