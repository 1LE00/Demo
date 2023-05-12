const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const User = require("../model/Users");

router
    .route("/user")
    .get(async (req, res) => {
        if (req.isAuthenticated()) {
            res.clearCookie("previousUrl");
            res.clearCookie("userRidirect");
            const user = await User.findOne({ username: req.user.username });
            res.render("user", {
                username: user.name,
                loggedIn: true
            });
        } else {
            const referrerUrl = req.originalUrl;
            res
                .cookie("previousUrl", `${referrerUrl}`, {
                    maxAge: 5 * 60 * 1000,
                    httpOnly: true,
                })
                .cookie("userRedirect", "true", {
                    maxAge: 5 * 60 * 1000,
                    httpOnly: true,
                })
                .redirect("/login");
        }
    });

module.exports = router;
