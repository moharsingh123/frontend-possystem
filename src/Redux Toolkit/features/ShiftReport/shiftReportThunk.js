import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const startShift= createAsyncThunk("/shiftReport/start",
    async(_, {rejectWithValue})=>{
        try {
            const headers = getAuthHeader();
            const res = await api.post("/api/shift-reports/start", {}, {
                headers: headers,
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "shift- started is failed",
            );
        }

    }
)
export const endShift= createAsyncThunk("/shiftReport/end",
    async(_, {rejectWithValue})=>{
        try {
            const headers = getAuthHeader();
            const res = await api.patch("/api/shift-reports/end",{},{
                headers: headers,
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "shift-end is failed",
            );
        }

    }
);

export const getCurrentShiftProgress= createAsyncThunk("/shiftReport/getCurrent",
    async(_, {rejectWithValue})=>{
        try {
            const headers = getAuthHeader();
            const res = await api.get("/api/shift-reports/current",{
                headers: headers,
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "current shift  is failed",
            );
        }

    }
)
export const getShiftReportByDate= createAsyncThunk("/shiftReport/getByDate",
    async({cashierId , date}, {rejectWithValue})=>{
        try {
            const headers = getAuthHeader();
            const formattedDate = String(date).slice(0, 10);
            const res = await api.get(`/api/shift-reports/cashier/${cashierId}/by-date`,{
                params: { date: formattedDate },
                headers: headers,
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "shift by date  is failed",
            );
        }

    }
)
export const getShiftReportByCashier= createAsyncThunk("/shiftReport/getByCashier",
    async({cashierId }, {rejectWithValue})=>{
        try {
            const headers = getAuthHeader();
            
            const res = await api.get(`/api/shift-reports/cashier/${cashierId}`,{
                headers: headers,
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " shift-report  by cashier  is failed",
            );
        }

    }
)
export const getShiftReportByBranch= createAsyncThunk("/shiftReport/getByBranch",
    async({branchId }, {rejectWithValue})=>{
        try {
            const headers = getAuthHeader();
            
            const res = await api.get(`/api/shift-reports/branch/${branchId}`,{
                headers: headers,
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " shift-report  by Branch  is failed",
            );
        }

    }
)
export const getShiftById= createAsyncThunk("/shiftReport/getById",
    async({id }, {rejectWithValue})=>{
        try {
            const headers = getAuthHeader();
            
            const res = await api.get(`/api/shift-reports/${id}`,{
                headers: headers,
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " shift-report  by id  is failed",
            );
        }

    }
)