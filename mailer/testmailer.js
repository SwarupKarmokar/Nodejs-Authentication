// CREATING MAIL FUNCTIONALITY 
const nodeMailer = require("../mailer/nodemailer");
const User = require("../models/userSchema");


exports.loginAlert = (user) => {
    console.log('inside alert mailer');

    nodeMailer.transporter.sendMail({
        from: 'mrunknown.0086@gmail.com',
        to: user.email,
        subject: "new login alert",
        html: '<h1>login loginAlert</h1>'
    },
        (err, info) => {
            if (err) {
                console.log('error in sending mail', err);
            }
            console.log("mail sent", info);
            return;
        }
    );
} 