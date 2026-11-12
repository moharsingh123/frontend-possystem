import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../Auth/authSlice";
import {
    endShift,
    getCurrentShiftProgress,
    getShiftById,
    getShiftReportByBranch,
    getShiftReportByCashier,
    getShiftReportByDate,
    startShift,
} from "./shiftReportThunk";

const initialState = {
    shifts: [],
    currentShift: null,
    selectedShift: null,
    shiftByCashier: [],
    shiftByBranch: [],
    loading: false,
    error: null,
};

const shiftReportSlice = createSlice({
    name: "shiftReport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logout, () => initialState)
            .addCase(startShift.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(startShift.fulfilled, (state, action) => {
                state.loading = false;
                state.currentShift = action.payload;
                state.error = null;
            })
            .addCase(startShift.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(endShift.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(endShift.fulfilled, (state, action) => {
                state.loading = false;
                state.currentShift = action.payload;
                const index = state.shifts.findIndex((shift) => shift.id === action.payload.id);
                if (index >= 0) state.shifts[index] = action.payload;
                state.error = null;
            })
            .addCase(endShift.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCurrentShiftProgress.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedShift = null;
            })
            .addCase(getCurrentShiftProgress.fulfilled, (state, action) => {
                state.loading = false;
                state.currentShift = action.payload;
                state.error = null;
            })
            .addCase(getCurrentShiftProgress.rejected, (state, action) => {
                state.loading = false;
                state.currentShift = null;
                state.error = action.payload;
            })
            .addCase(getShiftReportByDate.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedShift = null;
            })
            .addCase(getShiftReportByDate.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedShift = action.payload;
                state.error = null;
            })
            .addCase(getShiftReportByDate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getShiftReportByCashier.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getShiftReportByCashier.fulfilled, (state, action) => {
                state.loading = false;
                state.shiftByCashier = action.payload;
            })
            .addCase(getShiftReportByCashier.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getShiftReportByBranch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getShiftReportByBranch.fulfilled, (state, action) => {
                state.loading = false;
                state.shiftByBranch = action.payload;
            })
            .addCase(getShiftReportByBranch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getShiftById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getShiftById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedShift = action.payload;
            })
            .addCase(getShiftById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default shiftReportSlice.reducer;
