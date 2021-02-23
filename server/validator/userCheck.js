const { check } = require("express-validator");

exports.registerValidator = [
  check("username", "Username ist nötig").not().isEmpty(),
  check("email", "Email ist nötig").isEmail(),
  check("password", "Passwort ist nötig").isLength({ min: 6 })
];

exports.loginValidator = [
  check("email", "Email ist nötig").isEmail(),
  check("password", "Passwort ist nötig").isLength({ min: 6 })
];

exports.createUserValidator = [
  check("username", "Username ist nötig").not().isEmpty(),
  check("email", "Email ist nötig").isEmail(),
  check("password", "Passwort ist nötig").isLength({ min: 6 })
];

exports.updateUserValidator = [
  check("username", "Username ist nötig").not().isEmpty(),
  check("email", "Email ist nötig").isEmail(),
  check("password", "Passwort ist nötig").isLength({ min: 6 })
];
