const express = require("express");
const router = express.Router();
const {getMemberProfile, getAllProfile} = require("../controllers/profile");
const {auth} = require("../middlewares/auth");

router.get("/getAllProfile",auth, getAllProfile );
router.get("/getMemberProfile",auth, getMemberProfile);

module.exports = router;