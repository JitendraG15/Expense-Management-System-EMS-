import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  users:[],
  pendingTrans:[]
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    
    setUsers(state, action){
      state.users = action.payload
    },
    setPendingTrans(state, action){
      state.pendingTrans = action.payload
    }
  },
});

export const { setUsers,setPendingTrans } = profileSlice.actions;

export default profileSlice.reducer;