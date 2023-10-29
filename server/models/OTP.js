const mongoose = require("mongoose");


// Schema For OTP
const otpSchema = new mongoose.Schema({
      email:{
        type:String,
         required:true
      },
      otp:{
        type:Number,
        required:true
      },
      createAt:{
        type:Date,
        default:new Date(),
        expiresIn: 60*5
      }
});

module.exports = mongoose.model("OTP", otpSchema);