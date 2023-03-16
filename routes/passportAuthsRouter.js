import { Router } from "express";
import passport from "passport";
import { Authenticated, orderAuthenticate } from "../middlewares/index.js";
import passportAuthsController from "../controllers/passportAuthsController.js";

const passportAuthsRouter = Router();

// get

// login

passportAuthsRouter.get(
  "/login",
  Authenticated,
  passportAuthsController.getLogin
);

passportAuthsRouter.get(
  "/",
  Authenticated,
  passportAuthsController.redirectLogin
);

passportAuthsRouter.get("/login-error", passportAuthsController.getLoginError);

passportAuthsRouter.get("/logout", passportAuthsController.getLogout);

// signup

passportAuthsRouter.get("/signup", passportAuthsController.getSignup);

passportAuthsRouter.get(
  "/signup-error",
  passportAuthsController.getSignupError
);

// profile

passportAuthsRouter.get(
  "/profile/",
  Authenticated,
  passportAuthsController.getProfile
);

// post

passportAuthsRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/login-error" }),
  passportAuthsController.postLogin
);

passportAuthsRouter.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/signup-error" }),
  passportAuthsController.postSignup
);

passportAuthsRouter.post(
  "/createorder",
  orderAuthenticate,
  passportAuthsController.postCreateOrder
);

export default passportAuthsRouter;
