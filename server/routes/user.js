const express = require("express");
const { runValidation } = require("../validator");
const {
  registerValidator,
  loginValidator,
  createUserValidator,
  updateUserValidator
} = require("../validator/userCheck");
const { login, register } = require("../controllers/user");

const router = express.Router();

router.route("/login").post(loginValidator, runValidation, login);
router.route("/register").post(registerValidator, runValidation, register);

module.exports = router;
