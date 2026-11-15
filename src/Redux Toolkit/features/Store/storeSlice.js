import { createSlice } from "@reduxjs/toolkit";
import { createStore, getAllStores, getStoreByAdmin, getStoreByEmployee, getStoreById, moderateStore, updateStore } from "./storeThunk";





const initialState= {
    store:null,
    stores:[],
    employees:[],
    loading:false,
    error:null,
};

const storeSlice= createSlice({
    name:"store",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
            .addCase(createStore.pending, (state )=>{
                state.loading= true;
            })
            .addCase(createStore.fulfilled, (state, action)=>{
                state.loading= false;
                state.store=action.payload;
            })
            .addCase(createStore.rejected, (state, action)=>{
                state.loading= false;
                state.error=action.payload;
            })
            //  store id
            .addCase(getStoreById.fulfilled, (state,action )=>{
                state.loading= false;
                state.store=action.payload;
            })
            // get All Store
            .addCase(getAllStores.fulfilled, (state,action )=>{
                state.loading= false;
                state.stores=action.payload;
            })

            .addCase(updateStore.fulfilled, (state,action )=>{
                
                state.store=action.payload;
            })
            .addCase(getStoreByAdmin.fulfilled, (state,action )=>{
                
                state.store=action.payload;
            })
            .addCase(getStoreByEmployee.fulfilled , (state, action)=>{
                state.store= action.payload;
            })

            //  update the list after the moderation
            .addCase(moderateStore.fulfilled, (state, action)=>{
                const updatedStore = action.payload;
                state.stores = state.stores.map((store) =>
                    store.id === updatedStore.id ? updatedStore : store
                );
                if (state.store?.id === updatedStore.id) {
                    state.store = updatedStore;
                }
            })
            
    }
})
export default storeSlice.reducer;