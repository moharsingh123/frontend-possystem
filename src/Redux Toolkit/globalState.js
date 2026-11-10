import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice.js";
import userReducer from "./features/User/userSlice.js";
import customerReducer  from "./features/Customer/customerSlice.js"
import orderReducer from "./features/Order/orderSlice.js"
import refundReducer from "./features/Refund/refundSlice.js"
import shiftReportReducer from "./features/ShiftReport/shiftReportSlice.js"
const  globalState= configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        customer:customerReducer,
        order:orderReducer,
        refund:refundReducer,
        shiftReport:shiftReportReducer
    }
})

export default globalState;