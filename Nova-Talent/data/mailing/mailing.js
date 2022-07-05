var nodemailer = require('nodemailer');
const config = require('./config/config.json')
const mailContent = require('./config/mailContent.json')

function sendMail(userWhoNominate , userToNominate)
{
    var transporter = nodemailer.createTransport
    ({
      service: config.service,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass
      }
    });
    
    var mailOptions = 
    {
      from: mailContent.from,
      to: `${userWhoNominate} , ${userToNominate}`,
      subject: mailContent.subject,
      text: mailContent.text
    };
    
    transporter.sendMail(mailOptions, function(err, info)
    {
      distinguishErrorCases(err)
    });
}

function distinguishErrorCases(err)
{
    if (err) 
    {
        if (err.code == 'EENVELOPE')
        {
          console.log("An email could not be sent to address writed")
        }
    } 
    else 
    {
        console.log('Email sent: ' + info.response);
    }
}

module.exports =
{
    sendMail
}
