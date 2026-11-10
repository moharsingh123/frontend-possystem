import { createSlice } from "@reduxjs/toolkit";
import { createRefund, getAllRefund, getRefundById, getRefundsByBranch, getRefundsByCashier, getRefundsByCashierAndDateRange, getRefundsByShift } from "./refundThunk";


const initialState={
    refunds:[],
    refundsByCashier:[],
    refundsByBranch:[],
    refundsByShift:[],
    refundsByDateRange:[],
    selectedRefund:null,
    loading:false,
    error:null
};

const refundSlice= createSlice({
    name:"refund",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            // create the refund
            .addCase(createRefund.pending,(state)=>{
                state.loading=true
            
            })
            .addCase(createRefund.fulfilled,(state, action)=>{
                state.loading=false,
                state.refunds.push(action.payload);
            })
             .addCase(createRefund.rejected,(state, action)=>{
                state.loading=false,
                state.error=action.payload
             })
            //  Get ALl Refund
             .addCase(getAllRefund.pending,(state)=>{
                state.loading=true,
                state.error= null;
            
            })
             .addCase(getAllRefund.fulfilled,(state , action)=>{
                state.loading=false,
                state.refunds=action.payload
            
            })
             .addCase(getAllRefund.rejected,(state , action)=>{
                state.loading=false,
                state.error=action.payload
            
            })
            // Get Refunds By cashier
             .addCase(getRefundsByCashier.pending,(state )=>{
                state.loading=true,
                state.error=null
            
            })
             .addCase(getRefundsByCashier.fulfilled,(state , action)=>{
                state.loading=false,
                state.refundsByCashier= action.payload
            
            })
             .addCase(getRefundsByCashier.rejected,(state )=>{
                state.loading=false,
                state.error=action.payload
            
            })
            // Get Refunds By branch
             .addCase(getRefundsByBranch.pending,(state )=>{
                state.loading=true;
                state.error=null;
            
            })
             .addCase(getRefundsByBranch.fulfilled,(state , action)=>{
                state.loading=false;
                state.refundsByBranch= action.payload;
            
            })
             .addCase(getRefundsByBranch.rejected,(state )=>{
                state.loading=false;
                state.error=action.payload;
            
            })
            // Get Refunds By Shift
             .addCase(getRefundsByShift.pending,(state )=>{
                state.loading=true;
                state.error=null;
            
            })
             .addCase(getRefundsByShift.fulfilled,(state , action)=>{
                state.loading=false;
                state.refundsByShift= action.payload;
            
            })
             .addCase(getRefundsByShift.rejected,(state )=>{
                state.loading=false;
                state.error=action.payload;
            
            })
            
            // Get Refunds By Cashier And Date Range
             .addCase(getRefundsByCashierAndDateRange.pending,(state )=>{
                state.loading=true;
                state.error=null;
            
            })
             .addCase(getRefundsByCashierAndDateRange.fulfilled,(state , action)=>{
                state.loading=false;
                state.refundsByDateRange= action.payload;
            
            })
             .addCase(getRefundsByCashierAndDateRange.rejected,(state )=>{
                state.loading=false;
                state.error=action.payload;
            
            })// Get Refunds By Id 
             .addCase(getRefundById.pending,(state )=>{
                state.loading=true;
                state.error=null;
            
            })
             .addCase(getRefundById.fulfilled,(state , action)=>{
                state.loading=false;
                state.selectedRefund= action.payload;
            
            })
             .addCase(getRefundById.rejected,(state )=>{
                state.loading=false;
                state.error=action.payload;
            
            })
            
            

    }
})


export default refundSlice.reducer;