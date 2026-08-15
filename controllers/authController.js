const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username or email is already taken
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (!user) return res.status(401).json({ message: info.message });

    // Log the user into the session
    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });
      res.status(200).json({ message: "Login successful", userId: user._id });
    });
  })(req, res, next);
};

module.exports = { register, login };
