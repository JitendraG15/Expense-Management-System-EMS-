const mongoose = require("mongoose");

// Account Schema
const accountSchema = new mongoose.Schema({
  accountHolder: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Member",
  },
  balance: {
    type: Number,

    default: 0,
  },
  expense: {
    type: Number,
    default: 0,
  },
  deposit: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      default: [],
    },
  ],
});

module.exports = mongoose.model("Account", accountSchema);
