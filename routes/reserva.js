const express = require("express");
const router = express.Router();

router
    .route("/admin")
    .get(async (req, res) => {
        res.render("login", { message: "", loginUsername: "", loginPassword: "" });
    });

module.exports = router;
