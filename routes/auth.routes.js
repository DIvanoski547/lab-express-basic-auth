const bcrypt = require("bcrypt");
const saltRounds = 10;
const express = require("express");
const router = express.Router();
const Usersmodel = require("../models/User.model");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  Usersmodel.findOne({ username }).then((user) => {
    if (user) {
      res.render("auth/signup", { errorMessage: "Username already exists" });
    } else {
      bcrypt
        .hash(password, saltRounds)
        .then((hash) => {
          return Usersmodel.create({ username, password: hash });
        })
        .then((user) => {
          res.redirect("/profile");
        })
        .catch(err => console.log(err))
    }
  });
});

router.get("/profile", (req, res, next) => {
  res.render("auth/profile");
});

module.exports = router;
