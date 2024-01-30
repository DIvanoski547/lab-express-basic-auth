const bcrypt = require("bcrypt");
const saltRounds = 10;
const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const {isLoggedIn, isLoggedOut} = require("../middlewares/route-guard")

// SIGN UP ROUTES //
router.get("/signup", isLoggedOut, (req, res, next) => {
  console.log(req.session)
  res.render("auth/signup");
});

router.post("/signup", isLoggedOut, (req, res, next) => {
  const { username, password } = req.body;

  Usersmodel.findOne({ username })
  .then((user) => {
    if (user) {
      res.render("auth/signup", { errorMessage: "Username already exists" });
    } else {
      bcrypt
        .hash(password, saltRounds)
        .then((hash) => {
          return Usersmodel.create({ username, password: hash });
        })
        .then((user) => {
          req.session.currentUser = user;
          res.redirect("/profile");
        })
        .catch(err => console.log(err))
    }
  });
});

// LOGIN ROUTES //

router.get("/login", isLoggedOut, (req, res) => {
  console.log(req.session)
  res.render("auth/login")
})

module.exports = router;
