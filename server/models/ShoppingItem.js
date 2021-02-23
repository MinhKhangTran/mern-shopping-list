const mongoose = require("mongoose");

const shoppingItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Wir brauchen ein Item"]
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  { timestamps: true }
);

const ShoppingItem = mongoose.model("ShoppingItem", shoppingItemSchema);
module.exports = ShoppingItem;
