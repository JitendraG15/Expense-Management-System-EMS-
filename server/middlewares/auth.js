const jwt = require("jsonwebtoken");
require("dotenv").config();
// const Member = require("../models/Member");

//auth Middleware
exports.auth = async (req, res, next) => {
  try { 
    //extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorisation").replace("Bearer ", "");
     
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }
  
    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:",decode);
      req.user = decode;
    } catch (err) {
      
      return res.status(401).json({
        success: false,
        message: "Unable to Verify token: Invalid Token",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

//isStudent middleware
exports.isMember = async (req, res, next) => {
  try {
    if (req.user.role !== "member") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Members only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

//isInstructor middleware
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};


