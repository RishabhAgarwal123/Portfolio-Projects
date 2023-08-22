const nodeMailer = require('nodemailer');

const sendMail = async (options) => {
    const { email, subject, message } = options;

    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST, // Corrected the typo here
        port: process.env.SMPT_PORT, // Corrected the typo here
        secure: true, // Use SSL/TLS
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: email,
        subject: subject,
        text: message
    }

    await transporter.sendMail(mailOptions);
}

module.exports = sendMail;