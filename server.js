const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors("https://collegieum.com"));
// app.use(cors({ origin: "*" }));
app.use(express.json());

// ---------------------------
// Nodemailer Transporter
// ---------------------------
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// CHECK EMAIL CONNECTION
// transporter.verify((error, success) => {
//   if (error) {
//     console.log("Mailer Error:", error);
//   } else {
//     console.log("Nodemailer ready");
//   }
// });

// ---------------------------
// Helper to load templates
// ---------------------------
function loadTemplate(filename, data) {
  const filepath = path.join(__dirname, "templates", filename);
  const file = fs.readFileSync(filepath, "utf-8");
  const template = handlebars.compile(file);
  return template(data);
}

// ---------------------------
// 1️⃣ CONNECT FORM (contact)
// ---------------------------
app.post("/connect", async (req, res) => {
  const { fullName, university, email, logoUrl } = req.body;

  try {
    // Email → To USER
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Welcome to Collegieum – Your Campus Verification",
      html: loadTemplate("connectUser.hbs", {
        fullName,
        university,
        email,
        logoUrl,
      }),
    });

    // Email → To ADMIN
    // await transporter.sendMail({
    //   from: process.env.SMTP_USER,
    //   to: process.env.ADMIN_EMAIL,
    //   subject: "New Collegieum Connect Submission",
    //   html: loadTemplate("connectAdmin.hbs", {
    //     fullName,
    //     university,
    //     email,
    //     logoUrl,
    //   }),
    // });

    res.status(200).send("Your form submitted successfully.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to send emails.");
  }
});

// ---------------------------
// 2️⃣ JOIN-WITH-US FORM
// ---------------------------
app.post("/join-with-us", async (req, res) => {
  const {
    fullName,
    email,
    university,
    phone,
    department,
    year,
    role,
    reason,
    logoUrl,
  } = req.body;

  try {
    // Email → To USER
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your Application to Join Collegieum",
      html: loadTemplate("seeker.hbs", {
        fullName,
        email,
        university,
        phone,
        department,
        year,
        role,
        reason,
        logoUrl,
      }),
    });

    // Email → To ADMIN
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Join-With-Us Application Received",
      html: loadTemplate("seeker-admin.hbs", {
        fullName,
        email,
        university,
        phone,
        department,
        year,
        role,
        reason,
        logoUrl,
      }),
    });

    res.status(200).send("Application submitted successfully.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to send email.");
  }
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});