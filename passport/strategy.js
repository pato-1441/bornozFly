import { User } from "../models/user.js";
import bCrypt from "bcrypt";
import { createTransport } from "nodemailer";
import { mailConfig } from "../helpers/mailConfig.js";
import logger from "../helpers/logger.js";

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.password,
  },
});

const mailOptions = {
  from: "Bornoz Fly",
  to: mailConfig.user,
  subject: "A new user has registered in Bornoz Fly",
  html: "<h1>This is a test of nodemailer sending an mail from node.js</h1>",
};

const validatePassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

const createHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const login = (req, username, password, cb) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return cb(err);
    if (!user) {
      console.log("User not found with the username: " + username);
      return cb(null, false);
    }
    if (!validatePassword(user, password)) {
      console.log("Invalid password.");
      return cb(null, false);
    }
    return cb(null, user);
  });
};

const signup = (req, username, password, cb) => {
  User.findOne({ username: username }, async (err, user) => {
    if (err) {
      console.log("Error in signup: " + err);
      return cb(err);
    }
    if (user) {
      console.log("User already exists.");
      return cb(null, false);
    } else {
      try {
        const info = await transporter.sendMail(mailOptions);
        logger.info(info);
        const newUser = new User();
        newUser.username = username;
        newUser.password = createHash(password);
        newUser
          .save()
          .then((datos) => cb(null, datos))
          .catch(null, false);
      } catch (error) {
        logger.error(error);
      }
    }
  });
};

export { login, signup };
