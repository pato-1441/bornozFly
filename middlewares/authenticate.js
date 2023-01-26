const Authenticated = (req, res, next) => {
  console.log(req.user);
  /* const user = {
    username: req.user.username,
    password: req.user.password,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    address: req.user.address,
    birthday: req.user.birthday,
    phone: req.user.phone,
  }; */
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
export default Authenticated;
