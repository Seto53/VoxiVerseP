import "server-only";

const nodemailer = require("nodemailer");

export async function sendMail(subject, toEmail, otpText) {
    const transporter = nodemailer.createTransport({
        host: "smtp.zohocloud.ca",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PW,
        },
    });

    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: toEmail,
        subject: subject,
        text: otpText,
    };

    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        });
    });
}
