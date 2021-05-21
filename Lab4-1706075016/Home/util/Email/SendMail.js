const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

const SendMail = (to, subject, text, html, fn) => {
  const message = {
    from: process.env.NODEMAILER_EMAIL,
    to,
    subject,
    text: text || "",
    html: html || "",
  };

  transporter.sendMail(message, fn);
};

module.exports = SendMail;
