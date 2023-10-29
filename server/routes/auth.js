const express = require("express");
const router = express.Router();
const {signup, login, sendOtp} = require("../controllers/auth");
const {auth} = require("../middlewares/auth");


router.post("/signup", signup);

router.post("/login",login);
router.post("/sendOtp",auth,sendOtp);

module.exports = router;



