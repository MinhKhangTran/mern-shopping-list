const express = require("express");
const { runValidation } = require("../validator");
const {
  createShoppingItemValidator,
  updateShoppingItemValidator,
} = require("../validator/shoppingItemCheck");
const {
  getShoppingItems,
  addShoppingItem,
  getShoppingItemById,
  updateItemUser,
  updateItemAdmin,
  deleteItemUser,
  deleteItemAdmin,
} = require("../controllers/shoppingItem");
const { protect } = require("../middlewares/authMiddleware");
const { grantAccess } = require("../middlewares/roleMiddleware");

const router = express.Router();

router
  .route("/")
  .get(getShoppingItems)
  .post(createShoppingItemValidator, runValidation, protect, addShoppingItem);
router
  .route("/:id")
  .get(getShoppingItemById)
  .put(
    updateShoppingItemValidator,
    runValidation,
    protect,
    grantAccess("updateOwn", "item"),
    updateItemUser
  )
  .delete(protect, grantAccess("deleteOwn", "item"), deleteItemUser);
router
  .route("/admin/:id")
  .put(
    updateShoppingItemValidator,
    runValidation,
    protect,
    grantAccess("updateAny", "item"),
    updateItemAdmin
  )
  .delete(protect, grantAccess("deleteAny", "item"), deleteItemAdmin);
module.exports = router;
