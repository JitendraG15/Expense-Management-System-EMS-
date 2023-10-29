const mongoose = require("mongoose");

// User Schema
const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  memberAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
  role: {
    type: String,
    
    enum: ["admin", "member"],
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Member", memberSchema);
