const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// @desc    Login a user
// @route   POST /api/a1/users/login
// @access  public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(400);
    throw new Error("Du bist noch nicht angemeldet");
  }
  // check if user is there and password is right
  if (existingUser && (await existingUser.comparePassword(password))) {
    res.status(200).json({
      success: true,
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      token: generateToken(existingUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Es gab ein Fehler beim Einloggen!");
  }
});

// @desc    Register a user
// @route   POST /api/a1/users/register
// @access  public
exports.register = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("Diese Email ist schon vergeben");
  }
  // check if user is there and password is right
  const user = await User.create({
    email,
    username,
    password,
  });

  if (user) {
    res.status(200).json({
      success: true,
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Es gab ein Fehler beim Registrieren");
  }
});

// @desc    Get logged user
// @route   GET /api/a1/users/auth
// @access  private

// @desc    Get logged users
// @route   GET /api/a1/users
// @access  private/ ADMIN

// @desc    add new User
// @route   POST /api/a1/users/new
// @access  private/ ADMIN

// @desc    update a User
// @route   PUT /api/a1/users/:id
// @access  private/ ADMIN

// @desc    delete a User
// @route   DELETE /api/a1/users/:id
// @access  private/ ADMIN
