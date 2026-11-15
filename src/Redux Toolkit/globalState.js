import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice.js";
import userReducer from "./features/User/userSlice.js";
import customerReducer  from "./features/Customer/customerSlice.js"
import orderReducer from "./features/Order/orderSlice.js"
import refundReducer from "./features/Refund/refundSlice.js"
import shiftReportReducer from "./features/ShiftReport/shiftReportSlice.js"
import branchReducer from "./features/Branch/branchSlice.js"
import categoryReducer from "./features/Category/categorySlice.js"
import employeeReducer from "./features/Employee/employeeSlice.js"
import storeReducer from "./features/Store/storeSlice.js"
import productReducer from "./features/Product/product.Slice.js"
import storeAnalyticsReducer from "./features/Store Anaylytics/storeAnalyticsSlice.js"
const  globalState= configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        customer:customerReducer,
        order:orderReducer,
        refund:refundReducer,
        shiftReport:shiftReportReducer,
        branch:branchReducer,
        category: categoryReducer,
        employee:employeeReducer,
        store:storeReducer,
        product:productReducer,
        storeAnalytics:storeAnalyticsReducer,
        
    }
})

export default globalState;



// I write the code in the Redux toolkit folder inside the features folde newly added , check the code with the backend if the  code is right or  not and tell  me this code is not  call the api to bakend or not and also tell me  the written code is implement the backend logic  on frontend side and  this make the changes the are shown in the screen 