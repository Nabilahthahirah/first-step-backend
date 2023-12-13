const emailjs = require("@emailjs/nodejs");
const { EmailJSResponseStatus } = require("@emailjs/nodejs");
// const axios = require('axios');
require("dotenv").config();

const sendEmail = async (req, res) => {
  console.log(req.body);
  // return
  const { to_name, from_name, subject, message, to_email } = req.body;
  console.log(to_name, from_name, subject, message, to_email)
  try {
    await emailjs.send(
      process.env.SERVICE_ID_EMAIL,
      process.env.TEMPLATE_ID_EMAIL,
      { to_name, from_name, subject, message, to_email },
      {
        publicKey: process.env.USER_ID_EMAIL,
        privateKey: process.env.TOKEN_EMAIL, // optional, highly recommended for security reasons
      }
    );
    console.log("SUCCESS!");
    res.status(200).json({ success: true, message: "Email terkirim" });
  } catch (err) {
    if (err instanceof EmailJSResponseStatus) {
      console.log("EMAILJS FAILED...", err);
      res.status(500).json({ success: false, message: "Gagal mengirim email" });
      return;
    }

    console.log("ERROR", err);
  }

  // try {
  //   const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
  //     service_id: process.env.SERVICE_ID_EMAIL,
  //     template_id: process.env.TEMPLATE_ID_EMAIL,
  //     user_id: process.env.USER_ID_EMAIL,
  //     template_params: {
  //       to,
  //       from,
  //       subject,
  //       text
  //     },
  //     accessToken: process.env.TOKEN_EMAIL,
  //   });

  //   console.log('Email terkirim:', response.data);
  //   res.status(200).json({ success: true, message: 'Email terkirim' });
  // } catch (error) {
  //   console.error('Error saat mengirim email:', error.response.data);
  //   res.status(500).json({ success: false, message: 'Gagal mengirim email' });
  // }
};

module.exports = { sendEmail };
