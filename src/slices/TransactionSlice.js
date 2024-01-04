import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  balance:0,
  transactions:[],
  approvedTransaction:[]
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState: initialState,
  reducers: {
    
    setTransactions(state, action){
      state.transactions = action.payload
    },
    setApprovedTransaction(state, action){
      state.approvedTransaction = action.payload
    },
    setBalance(state, action){
        state.balance = action.payload;
    }
  },
});

export const { setTransactions, setApprovedTransaction,setBalance } = transactionSlice.actions;

export default transactionSlice.reducer;