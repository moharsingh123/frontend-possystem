import { createSlice } from "@reduxjs/toolkit"
import { createCustomer, deleteCustomer, getAllCustomer, getCustomerById, updateCustomer } from "./customerThunk";



const initialState= {
    customers: [],
    selectedCustomer: null,
    loading: false,
    error: null,
}

const customerSlice= createSlice({
    name: "customer",
    initialState,   
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // CREATE CUSTOMERS
            .addCase(createCustomer.pending, (state) => {
                state.loading = true;
                state.customers = [];
                state.error = null;

            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.loading = false;
                // state.customers.push(action.payload.data);
                state.customers= action.payload.data;
                state.error = null;
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.loading = false;
                state.customers = [];
                state.error = action.payload;
            })
            .addCase(updateCustomer.pending , (state)=>{
                state.loading = true;
               
            })
            .addCase(updateCustomer.fulfilled,  (state , action)=>{
                state.loading= false;
                const index= state.customers.findIndex(
                    (customer)=>customer.id=== action.payload.id
                )
                if(index!==-1){
                    state.customers[index]= action.payload;
                }
                if(state.selectedCustomer&&
                    state.selectedCustomer.id=== action.payload.id

                ){
                    state.selectedCustomer= action.payload;
                }
            })
            .addCase(updateCustomer.rejected,(state, action)=>{
                state.loading= false;
                state.error=action.payload;
            })
            //Delete customer

            .addCase(deleteCustomer.pending , (state)=>{
                state.loading= true;
            })
            .addCase(deleteCustomer.fulfilled, (state, action)=>{
                state.loading= false;
                state.customers= state.customers.filter(
                    (customer) =>customer.id!== action.payload
                );
                 if(state.selectedCustomer&&
                    state.selectedCustomer.id=== action.payload

                ){
                    state.selectedCustomer= null;
                }
            })
            .addCase(deleteCustomer.rejected,(state, action)=>{
                state.loading= false;
                state.error=action.payload;
            })

            // Get Customer by Id
              .addCase(getCustomerById.pending , (state)=>{
                state.loading= true;
            })
            .addCase(getCustomerById.fulfilled , (state, action)=>{
                state.loading= false;
                state.selectedCustomer= action.payload;
            })
             .addCase(getCustomerById.rejected,(state, action)=>{
                state.loading= false;
                state.error=action.payload;
            })
            // Get All Customer
              .addCase(getAllCustomer.pending , (state)=>{
                state.loading= true;
            })
            .addCase(getAllCustomer.fulfilled , (state, action)=>{
                state.loading= false;
                state.customers= action.payload;
            })
             .addCase(getAllCustomer.rejected,(state, action)=>{
                state.loading= false;
                state.error=action.payload;
            })
    }
            
})

export default customerSlice.reducer;