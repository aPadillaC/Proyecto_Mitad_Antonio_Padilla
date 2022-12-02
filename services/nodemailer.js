const nodemailer = require("nodemailer");

// CONFIGURACION nodemailer

async function main(email, mensajeEmail) {               
               
              
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "antoniopc88@gmail.com", // generated ethereal user
        pass: "hobiazxtbytcxqpf", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Bienvenido a MundoColeccionista" <antoniopc88@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `${mensajeEmail}`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                  
  }
  
  module.exports = {main}; // la estoy exportando como objeto
  