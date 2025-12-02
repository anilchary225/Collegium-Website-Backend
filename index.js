// const nm = require("nodemailer")
// const dotenv = require("dotenv")

// dotenv.config()

// var transporter = nm.createTransport(
//     {
//         host: process.env.SMTP_HOST,
//         port: process.env.SMTP_PORT,
//         secure: false,
//         auth:{
//             user:process.env.SMTP_USER,
//             pass:process.env.SMTP_PASS
//         }
//     }
// )

// var options = {
//     from:process.env.SMTP_USER,
//     to:'vadlaanilchary225@gmail.com',
//     subject:"Test Email",
//     text:"This is a test email sent using Nodemailer." ,//html can also be used here
//     attachments:[
//         {
//             filename:'test.txt',
//             content:'Hello, this is a test attachment!',
//             path:'./test.txt'
//         }
//     ]
// }

// transporter.sendMail(
//     options,
//     function(err,info){
//         if(err){
//             console.log(err)
//             return
//         }
//         console.log("Email sent: "+info.response)
//     }
// )