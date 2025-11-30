import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  // true for port 465, false for other ports
  auth: {
    user: "colab.innovate@gmail.com",
    pass: "zmmuxihgsgodxavg",
  },
});

export const sender = "colab.innovate@gmail.com";

// async..await is not allowed in global scope, must use a wrapper

// send mail with defined transport object

// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
