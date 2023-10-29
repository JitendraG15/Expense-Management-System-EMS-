const mongoose = require("mongoose");

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required:true
  },
  itemNames: [
    {
      type: String,
      required: true,
    },
  ],
  membersInvolved: [
    {
      type: String,
      required: true,
    },
  ],
  expense: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
