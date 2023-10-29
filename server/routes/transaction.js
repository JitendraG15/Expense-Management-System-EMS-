const express = require("express");
const router = express.Router();
const {getAllApprovedTransaction, addTransaction, getAllTransaction, approve, reject, getAccountDetails, getPendingTransactions} = require("../controllers/transaction");
const {auth, isAdmin} = require("../middlewares/auth");

router.post("/addTransaction",auth,addTransaction );
router.get("/getAllTransaction",auth,  getAllTransaction);
router.put("/approve", auth, isAdmin, approve);
router.put("/reject", auth, isAdmin, reject);
router.get("/getAccountDetails", auth,getAccountDetails);
router.get("/getPendingTransactions", auth, isAdmin, getPendingTransactions );
router.get("/getAllApprovedTransaction", auth, isAdmin, getAllApprovedTransaction);

module.exports = router;