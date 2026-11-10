import { createSlice } from "@reduxjs/toolkit";
import { getAllCashier, getAllCustomers, getUserById, getUserProfile, logout } from "./userThunk";

const initialState = {
    userProfile: null,
    users: [],
    customers: [],
    cashiers: [],
    selectedUser: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUserState: (state) => {
            state.userProfile = null;
            state.users = [];
            state.customers = [];
            state.cashiers = [];
            state.selectedUser = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(getAllCustomers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllCashier.fulfilled, (state, action) => {
                state.loading = false;
                state.cashiers = action.payload;
            })
            .addCase(getAllCashier.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCashier.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedUser = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.userProfile = null;
                state.selectedUser = null;
                state.error = null;
            });
    },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
