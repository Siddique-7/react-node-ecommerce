import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully ✅");
  } catch (error) {
    console.log("EMAIL ERROR:", error);
    throw error; // VERY IMPORTANT
  }
};

export default sendEmail;