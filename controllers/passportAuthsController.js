import { twilioService } from "../helpers/twilioConfig.js";
import { sendOrder } from "../socket.js";

const getLogin = (req, res) => {
  res.render("login");
};

const redirectLogin = (req, res) => {
  res.redirect("login");
};

const getLoginError = (req, res) => {
  res.render("login-error", {});
};

const getLogout = (req, res) => {
  const { firstname } = req.user;
  req.logout((err) => {
    if (err) {
      return err;
    }
    res.render("logout", { firstname });
  });
  /* req.logout();
  res.render("logout", { username }); */
};

const getSignup = (req, res) => {
  res.render("signup");
};

const getSignupError = (req, res) => {
  res.render("signup-error", {});
};

const getProfile = (req, res) => {
  const { username } = req.user;
  res.render("profile", { username });
};

const postLogin = (req, res) => {
  res.redirect("/");
};

const postSignup = (req, res) => {
  res.redirect("/");
};

const postCreateOrder = (req, res) => {
  const { body, user } = req;
  const orderData = { body, user };
  sendOrder(orderData);
  twilioService.sendWhatsapp(orderData);
  res.redirect("/");
};

export default {
  getLogin,
  redirectLogin,
  getLoginError,
  getLogout,
  getProfile,
  getSignup,
  getSignupError,
  postLogin,
  postSignup,
  postCreateOrder
};
