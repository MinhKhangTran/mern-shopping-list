const express = require("express");
const { runValidation } = require("../validator");
const {
  createShoppingItemValidator,
  updateShoppingItemValidator
} = require("../validator/shoppingItemCheck");

const router = express.Router();

router.route("/");

module.exports = router;
