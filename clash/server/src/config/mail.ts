import nodemailer from 'nodemailer';


export const transporter = nodemailer.createTransport({
host: "smtp.gmail.com", // SMTP server address
port: 587,
secure: false, //true for 465, false for other ports
auth: {
    user: process.env.FROM_EMAIL ,
    pass: process.env.FROM_PASSWORD, 
},
});

export const sendEmail = async (to:string, subject:string, body:string ) =>{
    await transporter.sendMail({
    from: process.env.FROM_EMAIL, // Sender address,
    to: to,
    subject: subject,
    html: body, // HTML body
});
}