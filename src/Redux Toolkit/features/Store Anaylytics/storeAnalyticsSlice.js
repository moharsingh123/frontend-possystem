import { createSlice } from "@reduxjs/toolkit";
import { loadStoreAnalytics } from "./storeAnalyticsThunk";

const initialState = {
    storeName: "",
    branches: [],
    reports: [],
    range: { startDate: "", endDate: "" },
    loading: false,
    error: null,
};

const storeAnalyticsSlice = createSlice({
    name: "storeAnalytics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadStoreAnalytics.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.storeName = "";
                state.branches = [];
                state.reports = [];
            })
            .addCase(loadStoreAnalytics.fulfilled, (state, action) => {
                state.loading = false;
                state.storeName = action.payload.storeName;
                state.branches = action.payload.branches;
                state.reports = action.payload.reports;
                state.range = {
                    startDate: action.payload.startDate,
                    endDate: action.payload.endDate,
                };
            })
            .addCase(loadStoreAnalytics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || "Unable to load sales analytics.";
            });
    },
});

export default storeAnalyticsSlice.reducer;