const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const smtpConfig = {
    service: "smtp.gmail.com",
    port: 465,
    secure: false,
    ignoreTLS: true,
    auth: {
      user: "moeezahmed2003@gmail.com",
      pass: "MOEEZmoeez2003",
    },
  };
  const transporter = nodemailer.createTransport(smtpConfig);
  const mailOptions = {
    from: "moeezahmed2003@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
