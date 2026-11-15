import { createSlice } from "@reduxjs/toolkit"

import { createBranchEmployee, createStoreEmployee, deleteEmployee, findBranchEmployees, findEmployeeById, findStoreEmployees, updateEmployee } from "./employeeThunk"








const initialState ={
    employees:[],
    employee:null,
    error:null,
    loading:false
}

const employeeSlice=  createSlice({
    name:"employee",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(createStoreEmployee.pending , (state)=>{
                state.loading = true;
                
            })
            .addCase(createStoreEmployee.fulfilled , (state ,action)=>{
                state.loading = false;
                state.employees.push(action.payload)
                
            })
            .addCase(createStoreEmployee.rejected , (state, action)=>{
                state.loading = false;
                state.error= action.payload;
            })
            .addCase(createBranchEmployee.pending , (state)=>{
                state.loading = true;
                
            })
            .addCase(createBranchEmployee.fulfilled , (state ,action)=>{
                state.loading = false;
                state.employees.push(action.payload)
                
            })
            .addCase(createBranchEmployee.rejected , (state, action)=>{
                state.loading = false;
                state.error= action.payload;
            })
            .addCase(updateEmployee.fulfilled , (state, action)=>{
                const index= state.employees.findIndex((e)=>e.id===action.payload.id)
                if(index!== -1){
                    state.employees[index]= action.payload
                }
                    
                
            })
            .addCase(deleteEmployee.fulfilled, (state, action)=>{
                state.employees= state.employees.filter(
                    (e)=>e.id!== action.payload
                );
                if (state.employee?.id === action.payload) {
                    state.employee = null;
                }
            })
            .addCase(findEmployeeById.fulfilled , (state ,action)=>{
                // state.loading = false;
                state.employee=action.payload;
                
            })
            .addCase(findStoreEmployees.fulfilled , (state ,action)=>{
                // state.loading = false;
                state.employees=action.payload;
                
            })
            .addCase(findBranchEmployees.fulfilled , (state ,action)=>{
                // state.loading = false;
                state.employees=action.payload;
                
            })

    }
})

export default employeeSlice.reducer;