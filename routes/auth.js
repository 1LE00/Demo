const express = require("express");

const router = express.Router();
const usersController = require("../controllers/usersController");

router
  .route("/login(.html)?")
  .get((req, res) => {
    res.render("login", {
      message: "",
      loginUsername: "",
      loginPassword: "",
    });
  })
  .post(usersController.handleSignIn);

router
  .route("/register(.html)?")
  .get((req, res) => {
    res.render("register", {
      message: "",
      registerName: "",
      registerEmail: "",
      condition: false,
    });
  })
  .post(usersController.handleRegister);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});
module.exports = router;
