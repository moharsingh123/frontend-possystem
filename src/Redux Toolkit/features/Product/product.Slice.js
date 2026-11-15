import { createSlice } from "@reduxjs/toolkit";
import { createProduct, deleteProduct, getProductById, getProductsByStore, searchProducts, updateProduct } from "./productThunk";





const initialState= {
    product:null,
    products:[],
    searchResults:[],
    loading:false,
    error:null
};


const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers:(building)=>{
        building
            .addCase(createProduct.pending, (state)=>{
                state.loading= true;
            })
            .addCase(createProduct.fulfilled, (state , action)=>{
                state.loading= false;
                state.products.push(action.payload);
                
            })
            .addCase(createProduct.rejected, (state, action)=>{
                state.loading=false;
                state.error= action.payload;
            })
            .addCase(getProductById.fulfilled, (state , action)=>{
                state.loading= false;
                state.product= action.payload;
                
            })
            .addCase(updateProduct.fulfilled, (state , action)=>{
            const index= state.products.findIndex(
                (p)=>p.id===action.payload.id
            );
            if(index!==-1){
                state.products[index]= action.payload;
            }
                
            })
            .addCase(deleteProduct.fulfilled, (state, action)=>{
                state.products= state.products.filter(
                    (p)=>p.id!== action.payload
                );
                if (state.product?.id === action.payload) {
                    state.product = null;
                }
            })
            .addCase(getProductsByStore.fulfilled, (state , action)=>{
                state.loading= false;
                state.products= action.payload;
                
            })

            .addCase(searchProducts.pending, (state)=>{
                state.loading= true;
            })
            .addCase(searchProducts.fulfilled, (state , action)=>{
                state.loading= false;
                state.searchResults= action.payload;
                
            })
            .addCase(searchProducts.rejected, (state, action)=>{
                state.loading=false;
                state.error= action.payload;
            })



    }
})

export default productSlice.reducer;