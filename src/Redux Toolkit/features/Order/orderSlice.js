import { createSlice } from "@reduxjs/toolkit";
import {
    createOrder,
    deleteOrder,
    getOrderByCashier,
    getOrderById,
    getOrdersByBranch,
    getOrdersByCustomer,
    getRecentOrdersByBranch,
    getTodayOrdersByBranch,
} from "./orderThunk";

const initialState = {
    orders: [],
    todayOrders: [],
    customerOrders: [],
    selectedOrder: null,
    recentOrders: [],
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedOrder = action.payload;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOrdersByBranch.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(getOrderByCashier.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(getTodayOrdersByBranch.fulfilled, (state, action) => {
                state.todayOrders = action.payload;
            })
            .addCase(getOrdersByCustomer.fulfilled, (state, action) => {
                state.customerOrders = action.payload;
            })
            .addCase(getRecentOrdersByBranch.fulfilled, (state, action) => {
                state.recentOrders = action.payload;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter((order) => order.id !== action.payload);
            });
    },
});

export default orderSlice.reducer;
