const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async ({ from = EMAIL_FROM, to, subject, message }) => {
  try {
    const email = {
      to,
      from,
      subject,
      html: message,
    };

    await sgMail.send(email);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { sendEmail };
