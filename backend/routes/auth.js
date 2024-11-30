const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

require("dotenv").config();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, roleType } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new User({
      firstName,
      lastName,
      email,
      password,
      roleType,
    });
    await user.save();
    const payload = {
      user: {
        id: user._id,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`SERVER ERRROR ${err.message}`);
  }
});

router.get("/register", async (req, res) => {
  res.status(500).send(`SERVER CANNOT RESPOND ${req.message}`);
});

router.get("/login", async (req, res) => {
  res.status(500).send(`SERVER CANNOT RESPOND ${req.message}`);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const payload = {
      user: {
        id: user._id,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
});

module.exports = router;
