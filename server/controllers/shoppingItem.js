const ShoppingItem = require("../models/ShoppingItem");
const asyncHandler = require("express-async-handler");

// @desc    Get Shoppingitems
// @route   GET /api/a1/shoppingItems
// @access  public
exports.getShoppingItems = asyncHandler(async (req, res) => {
  const items = await ShoppingItem.find({}).sort({ createdAt: -1 });
  res
    .status(200)
    .json({ success: true, totalCount: items.length, data: items });
});

// @desc    Get Shoppingitem by id
// @route   GET /api/a1/shoppingItems/:id
// @access  public
exports.getShoppingItemById = asyncHandler(async (req, res) => {
  const item = await ShoppingItem.findById(req.params.id);
  if (!item) {
    res.status(400);
    throw new Error("Kein Item mit dieser ID");
  }
  res.status(200).json({ success: true, data: item });
});

// @desc    add new ShoppingItem
// @route   POST /api/a1/shoppingItems
// @access  private
exports.addShoppingItem = asyncHandler(async (req, res) => {
  //   console.log(req.user);
  // const user = req.user._id

  const newItem = await ShoppingItem.create({
    name: req.body.name,
    user: req.user._id,
  });
  if (!newItem) {
    res.status(400);
    throw new Error("Es gab ein Fehler beim Erstellen eines Items");
  }
  const item = await newItem.save();
  res.status(200).json({ success: true, data: item });
});

// @desc    update a ShoppingItem
// @route   PUT /api/a1/shoppingItems/:id
// @access  private/OWNER
exports.updateItemUser = asyncHandler(async (req, res) => {
  let item = await ShoppingItem.findById(req.params.id);
  if (!item) {
    res.status(400);
    throw new Error("Kein Item mit dieser ID");
  }

  if (req.user._id.toString() !== item.user.toString()) {
    res.status(400);
    throw new Error("Dieses Item darfst du nicht ändern!");
  } else {
    item = await ShoppingItem.findByIdAndUpdate(
      req.params.id,
      { $set: { name: req.body.name } },
      { new: true }
    );
  }

  res.status(200).json({ success: true, data: item });
});

// @desc    update a ShoppingItem as admin
// @route   PUT /api/a1/shoppingItems/admin/:id
// @access  private/ADMIN
exports.updateItemAdmin = asyncHandler(async (req, res) => {
  let item = await ShoppingItem.findById(req.params.id);
  if (!item) {
    res.status(400);
    throw new Error("Kein Item mit dieser ID");
  }

  item = await ShoppingItem.findByIdAndUpdate(
    req.params.id,
    { $set: { name: req.body.name } },
    { new: true }
  );

  res.status(200).json({ success: true, data: item });
});

// @desc    delete a ShoppingItem
// @route   DELETE /api/a1/shoppingItems/:id
// @access  private/OWNER
exports.deleteItemUser = asyncHandler(async (req, res) => {
  let item = await ShoppingItem.findById(req.params.id);
  if (!item) {
    res.status(400);
    throw new Error("Kein Item mit dieser ID");
  }

  if (req.user._id.toString() !== item.user.toString()) {
    res.status(400);
    throw new Error("Dieses Item darfst du nicht löschen!");
  } else {
    await ShoppingItem.findByIdAndRemove(req.params.id);
  }

  res.status(200).json({ success: true, data: {} });
});

// @desc    delete a ShoppingItem as admin
// @route   DELETE /api/a1/shoppingItems/admin/:id
// @access  private/ADMIN
exports.deleteItemAdmin = asyncHandler(async (req, res) => {
  let item = await ShoppingItem.findById(req.params.id);
  if (!item) {
    res.status(400);
    throw new Error("Kein Item mit dieser ID");
  }

  await ShoppingItem.findByIdAndRemove(req.params.id);

  res.status(200).json({ success: true, data: {} });
});
