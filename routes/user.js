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
  "/signup",
  [
    check("email", "invalid email").isEmail(),
    check("password", "invalid password").isLength({ min: 6 }),
    check("username", "invalid username").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() });
    }
    const { email, password, username } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).send({ message: "user already exists" });
      }
      user = new User({
        email,
        password,
        username,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        id: user.id,
      };
      const access = getAccessToken(payload);
      const refresh = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
      //Logic needs to register refresh tokens to database and ensure that upon signout that token doesnt work anymore
      res.status(201).send({ refresh: refresh, access: access });
    } catch (err) {
      console.log(err.messsage);
      res.status(500).send({ errors: "server error" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "email not valid").isEmail(),
    check("password", "password not valid").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: "email/password invalid" });
    }
    const { email, password } = req.body;
    try {
      let user = User.findOne({ email });
      if (!user) {
        res.status(400).send({ errors: "user does not exist" });
      }
      const payload = {
        id: user.id,
      };
      const access = getAccessToken(payload);
      const refresh = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
      res.status(200).send({
        access: access,
        refresh: refresh,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ errors: "server error" });
    }
  }
);

//Logout will remove the current instance of refresh token from mongo
//router.delete

router.post("/token", (req, res) => {
  const refresh = req.body.refresh;
  if (!refresh) res.status(401).send({ message: "invalid token" });

  try {
    jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
      if (error) res.status(403).send({ message: "invalid token" });
      const payload = {
        id: user.id,
      };
      const access = getAccessToken(payload);
      res.status(200).send({ access: access });
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "invalid token" });
  }
});
module.exports = router;
