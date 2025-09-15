const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

require("dotenv").config();

router.post("/register", register);


router.post("/login",login);

module.exports = router;
