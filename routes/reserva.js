const express = require("express");
const router = express.Router();

router
    .route("/")
    .get(async (req, res) => {
        // res.render("login", {
        //     message: "",
        //     loginUsername: "",
        //     loginPassword: "",
        // });
        res.send("asdhl")
    });

module.exports = router;
