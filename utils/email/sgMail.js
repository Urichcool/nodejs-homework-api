const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationToken = async (mail, token) => {
    const msg = {
        to: mail,
        from: "urichcoolx@gmail.com",
        subject: "Email verification",
        text: `Let's verify your email address`,
        html: `<strong>By clicking on the following link, you are confirming your email address <a href=${`http://localhost:3000/api/users/verify/${token}`}>VERIFY</a></strong>`,
    };
    await sgMail
        .send(msg);
};

module.exports = {sendVerificationToken}