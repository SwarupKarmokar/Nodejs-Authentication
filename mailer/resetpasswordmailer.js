// RESETING PASSWORD USING NODE MAILER 
const nodeMailer = require("../mailer/nodemailer");
const User = require("../models/userSchema");
const session = require('express-session');



exports.resetMail = (k, user, name) => {
    console.log('inside Reset mailer');
    console.log(user);
    var otp;

    nodeMailer.transporter.sendMail({
        from: 'mrunknown.0086@gmail.com',
        to: user,

        subject: "Password Reseted Successfully",
        html: `<h1> Hey ${name} Password Reset Done: <br> Your Temporary Password  is: ${k} <br> We suggest you to change it later </h1>`
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

