const { check } = require("express-validator");

exports.createShoppingItemValidator = [
  check("name", "Name ist nötig").not().isEmpty()
];

exports.updateShoppingItemValidator = [
  check("name", "Name ist nötig").not().isEmpty()
];
