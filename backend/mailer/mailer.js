const { fstat } = require('fs');
const nodemailer = require('nodemailer')

const hbs = require('nodemailer-express-handlebars'); 
const path = require('path');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8aa0d2836c2a4a",
      pass: "e8f41a21af8d34"
    }
  });

// transport.use('compile',  hbs({
//     viewEngine: 'handlebars',
//     viewPath: path.resolve('./mail/'),
//     extName: '.html'
// }))

transport.use('compile', hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve('./mail/')
    },
    viewPath: path.resolve('./mail/'),
    extName: '.html',
}));

module.exports = transport

// const smtpConfig = {
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: true, // use SSL
//   auth: {
//       user: 'joelton.porto@quartetto.com.br',
//       pass: 'A1b2c3d4f5'
//   }
// };

// const transporter = nodemailer.createTransport(smtpConfig);

//   const mailOptions = {
//     from: 'joeltonporto@quartetto.com.br', // sender address
//     to: 'joeltonportopl15@gmail.com', // receiver (use array of string for a list)
//     subject: 'node js', // Subject line
//     html: '<p>email de recuperacao'// plain text body
//   };

  

//   transporter.sendMail(mailOptions, (err, info) => {
//     if(err)
//       console.log(err)
//     else
//       console.log('info', info);
//  });


// module.exports = transporter