import { createTransport } from "nodemailer";
import logger from "./logger.js";

const mailConfig = {
  name: "Bornoz Fly",
  user: "albornozpatricio2004@gmail.com",
  password: "kyiogwbyqiexxtah",
};

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.password,
  },
});

export const sendMail = async (user) => {
  const mailOptions = {
    from: "Bornoz Fly",
    to: mailConfig.user,
    subject: "Bornoz Fly",
    html: `<h1>A user named '${user}' created an account in Bornoz Fly.</h1>`,
  };

  const info = await transporter.sendMail(mailOptions);
  logger.info(info);
};
