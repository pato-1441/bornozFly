import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user.js";
import * as strategy from "./strategy.js";

export const passportInit = () => {
  passport.use(
    "login",
    new LocalStrategy({ passReqToCallback: true }, strategy.login)
  );

  passport.use(
    "signup",
    new LocalStrategy({ passReqToCallback: true }, strategy.signup)
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
