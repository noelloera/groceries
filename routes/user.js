const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, List, Item, mongoose } = require("../database/models/User.js");

getAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

router.post(
  "/login",
  [
    check("email", "email not valid").isEmail(),
    check("password", "password not valid").isLength({ min: 6 }),
  ],
  (req, res) => {
    console.log(req);
  }
);

module.exports = router;
