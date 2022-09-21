const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
exports.logout = (req, res, next) => {
  throw new Error("not implemented");
};

exports.register = async (req, res) => {
  const user = new User(req.body);
  user.password = await bcrypt.hash(user.password, 10);
  user.token = crypto.randomBytes(64).toString("hex");

  await user.save();

  res.cookie("user-token", user.token, {
    maxAge: 90000,
    sameSite: "strict",
    httponly: true,
  });
  res.status(200).send(user);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne().where("email").equals(email);

  if (!user) {
    const error = new Error("Diese Email kennen wir nicht");
    error.status = 400;
    return next(error);
  }
  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect) {
    const error = new Error("Password nicht correkt");
    error.status = 401;
    return next(error);
  }
  user.token = crypto.randomBytes(64).toString("hex");
  await user.save();
  res.cookie("user-token", user.token, {
    maxAge: 90000,
    sameSite: "strict",
    httponly: true,
  });
  res.status(200).send(user);
};
