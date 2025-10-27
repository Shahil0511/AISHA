import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpEmail(email: string, otp: string) {
  const mailOption = {
    from: ``,
    to: email,
    subject: "Your One-Time-Password (OTP)",
    html: `
        <div style ='font-family:sans-serif'>
        <h2>OTP Verificatoin</h2>
        <p>Your OTP for signup is: </p>
        <h1>${otp}</h1>
        <p>This OTP will expire in <b>${
          process.env.OTP_EXPIRES_IN_MIN || 10
        }</b>.</p>
        </div>
        `,
  };
  await mailer.sendMail(mailOption);
}
