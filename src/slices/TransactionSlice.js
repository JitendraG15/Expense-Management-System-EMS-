import { createSlice } from "@reduxjs/toolkit";


const initialState = {
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
    }
  },
});

export const { setTransactions, setApprovedTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;