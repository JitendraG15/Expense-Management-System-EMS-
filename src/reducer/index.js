import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/AuthSlice"
import profileReducer from "../slices/ProfileSlice";
import TransactionReducer from "../slices/TransactionSlice";


const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    transaction:TransactionReducer
    
})

export default rootReducer;