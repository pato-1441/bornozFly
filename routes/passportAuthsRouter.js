import { Router } from "express";
import passport from "passport";
import Authenticated from "../middlewares/authenticate.js";

const passportAuthsRouter = Router();

// get

// login

passportAuthsRouter.get("/login", Authenticated, (req, res) => {
  res.render("login");
});

passportAuthsRouter.get("/", Authenticated, (req, res) => {
  res.redirect("login");
});

passportAuthsRouter.get("/login-error", (req, res) => {
  res.render("login-error", {});
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

// signup

passportAuthsRouter.get("/signup", (req, res) => {
  res.render("signup");
});

passportAuthsRouter.get("/signup-error", (req, res) => {
  res.render("signup-error", {});
});

// profile

passportAuthsRouter.get("/profile/edit", Authenticated, (req, res) => {
  const { username } = req.user;
  res.render("profile", { username });
});

// post

passportAuthsRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/login-error" }),
  (req, res) => {
    res.redirect("/");
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
