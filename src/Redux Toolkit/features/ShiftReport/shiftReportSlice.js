import { createSlice } from "@reduxjs/toolkit"
import { endShift, getCurrentShiftProgress, getShiftById, getShiftReportByBranch, getShiftReportByCashier, getShiftReportByDate } from "./shiftReportThunk"


const initialState= {
    shifts:[],
    currentShift:null,
    selectedShift:null,
    shiftByCashier:[],
    shiftByBranch:[],
    loading:false,
    error:null,

}

const shiftReportSlice= createSlice({
    name:"shiftReport",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            // end shift 

            .addCase(endShift.pending,(state)=>{
                 state.loading=true;
                 state.error=null;
                        
            })
            .addCase(endShift.fulfilled,(state, action)=>{
                state.loading=false;
                // Update the curent shift with end time and final stats
                if(state.currentShift && state.currentShift.id===action.payload.id){
                    state.currentShift= action.payload;
                }
                // update the shift in the shift array
                const index= state.shifts.findIndex(shift=>shift.id===action.payload.id);
                if(index!==-1){
                    state.shifts[index]=action.payload;
                }
                
               
            })
            .addCase(endShift.rejected,(state, action)=>{
                state.loading=false,
                state.error=action.payload
            })
            // Get Current Shift Progress
            .addCase(getCurrentShiftProgress.pending,(state)=>{
                 state.loading=true;
                 state.error= null;
                        
            })
            .addCase(getCurrentShiftProgress.fulfilled,(state, action)=>{
                state.loading=false,
                state.currentShift= action.payload;
                
            })
            .addCase(getCurrentShiftProgress.rejected,(state, action)=>{
                state.loading=false,
                state.error=action.payload
            })  

            // // Get Shift Report by Date
            .addCase(getShiftReportByDate.pending,(state)=>{
                 state.loading=true;
                 state.error= null;
                        
            })
            .addCase(getShiftReportByDate.fulfilled,(state, action)=>{
                state.loading=false,
                state.selectedShift= action.payload;
                
            })
            .addCase(getShiftReportByDate.rejected,(state, action)=>{
                state.loading=false,
                state.error=action.payload
            })                
            // Get Shift Report by Cashier
            .addCase(getShiftReportByCashier.pending,(state)=>{
                 state.loading=true;
                 state.error= null;
                        
            })
            .addCase(getShiftReportByCashier.fulfilled,(state, action)=>{
                state.loading=false,
                state.shiftByCashier= action.payload;
                
            })
            .addCase(getShiftReportByCashier.rejected,(state, action)=>{
                state.loading=false,
                state.error=action.payload
            })     
            //    get Shift By Branch

            .addCase(getShiftReportByBranch.pending,(state)=>{
                 state.loading=true;
                 state.error= null;
                        
            })
            .addCase(getShiftReportByBranch.fulfilled,(state, action)=>{
                state.loading=false,
                state.shiftByBranch= action.payload;
                
            })
            .addCase(getShiftReportByBranch.rejected,(state, action)=>{
                state.loading=false,
                state.error=action.payload
            })             
            //    get Shift By Id

            .addCase(getShiftById.pending,(state)=>{
                 state.loading=true;
                 state.error= null;
                        
            })
            .addCase(getShiftById.fulfilled,(state, action)=>{
                state.loading=false,
                state.selectedShift= action.payload;
                
            })
            .addCase(getShiftById.rejected,(state, action)=>{
                state.loading=false,
                state.error=action.payload
            })             

    }
})
export default shiftReportSlice.reducer;