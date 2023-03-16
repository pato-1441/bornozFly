const Authenticated = (req, res, next) => {
  if (req.isAuthenticated())
    return res.render("home", {
      username: req.user.username,
      password: req.user.password,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      address: req.user.address,
      birthday: req.user.birthday,
      phone: req.user.mobilenumber,
    });
  next();
};

const orderAuthenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
};
export { Authenticated, orderAuthenticate };
