const express = require("express");
const router = express.Router();
// const {signup, login, sendOtp} = require("../controllers/auth");
// const {auth, isMember, isAdmin} = require("../middlewares/auth");


router.get("/", (req, res)=> res.send("Welcome to home page"))

module.exports = router;



