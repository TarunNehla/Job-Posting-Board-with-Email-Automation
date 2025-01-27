const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer'); 
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
});

// const mailOptions = {
//     from: {
//         name : '',
//         address : process.env.EMAIL
//     },
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
// }

const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log('email sent');
    } catch (error) {
        console.log(error);
    }
}

router.post('/send-mail', async (req,res) => {
    const {to, subject,text,html} = req.body;
    const mailOptions = {
        from: `"Tarun" <${process.env.EMAIL}>`,
        to,
        subject,
        text,
        html
    }

    try {
        await sendMail(transporter,mailOptions);
        res.status(200).json({message : 'Email Sent'});
    } catch (error) {
        res.status(500).json({message: 'error sending email', error});
    }
})

module.exports = router;
