import { Router } from "express";
import passport from "passport";
import Authenticated from "../middlewares/authenticate.js";
import { createTransport } from "nodemailer";
import { mailConfig } from "../helpers/mailConfig.js";

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.password,
  },
});

const mailOptions = {
  from: "Bornoz Fly",
  to: mailConfig.user,
  subject: "Trying nodemailer from Node.js",
  html: "<h1>This is a test of nodemailer sending an mail from node.js</h1>"
}

const passportAuthsRouter = Router();

// get

passportAuthsRouter.get("/signup-error", (req, res) => {
  res.render("signup-error", {});
});
passportAuthsRouter.get("/login-error", (req, res) => {
  res.render("login-error", {});
});

passportAuthsRouter.get("/signup", (req, res) => {
  res.render("signup");
});

passportAuthsRouter.get("/logout", (req, res) => {
  const { username } = req.user;
  req.logout((err) => {
    if (err) {
      return err;
    }
    res.render("logout", { username });
  });
  /* req.logout();
  res.render("logout", { username }); */
});

passportAuthsRouter.get("/login", Authenticated, (req, res) => {
  res.render("login");
});
passportAuthsRouter.get("/", Authenticated, (req, res) => {
  res.redirect("login");
});

//post

passportAuthsRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/login-error" }),
  async (req, res) => {
    try {
      const info = await transporter.sendMail(mailOptions)
      console.log(info);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
);

passportAuthsRouter.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/signup-error" }),
  (req, res) => {
    res.redirect("/");
  }
);

export default passportAuthsRouter;
