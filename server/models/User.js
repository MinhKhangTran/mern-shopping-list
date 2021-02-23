const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Wie heißt du?"],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, "Wie lautet deine E-Mail Adresse"],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Wie lautet dein Passwort"]
    },
    role: {
      type: String,
      enum: ["benutzer", "admin"],
      default: "benutzer"
    }
  },
  { timestamps: true }
);

// Pre save
userSchema.pre("save", async function (next) {
  let user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  next();
});

// compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  let user = this;
  return await bcrypt.compare(candidatePassword, user.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
