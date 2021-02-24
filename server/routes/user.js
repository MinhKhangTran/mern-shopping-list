const express = require("express");
const { runValidation } = require("../validator");
const {
  registerValidator,
  loginValidator,
  createUserValidator,
  updateUserValidator,
} = require("../validator/userCheck");
const { login, register, getLoggedUser } = require("../controllers/user");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/login").post(loginValidator, runValidation, login);
router.route("/register").post(registerValidator, runValidation, register);
router.route("/").get(protect, getLoggedUser);

module.exports = router;
