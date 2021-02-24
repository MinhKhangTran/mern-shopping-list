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
      role: existingUser.role,
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
      role: user.role,
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
exports.getLoggedUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("Du bist nicht authorisiert");
  }
  res.status(200).json({
    success: true,
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  });
});
// Peter token (admin)
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzU1OWRjMTBiODY4NmExODYyNjRjYyIsImlhdCI6MTYxNDEwOTE1OSwiZXhwIjoxNjE0NzEzOTU5fQ.-IyMPhlrXVDSc2i94ef6loRwBJ2C4zG5aH2nNAk3KdE
// Peter Item id
// 6035d5031a7a900100db003f

// mike token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzVkNzgwMTU0MzY1NDIwNDlkOTQ1MyIsImlhdCI6MTYxNDE0MTMxMywiZXhwIjoxNjE0NzQ2MTEzfQ.JZPjVHeCe4ebDYe8i6xUV_QYyNpzRN2VeSBkzkp3uLA
// Mike Item id
// 6035db8345d01a3e80228c25
