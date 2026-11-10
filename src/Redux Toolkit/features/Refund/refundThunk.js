import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createRefund = createAsyncThunk(
    "/refund/create",
    async (refundDTO, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();
            const res = await api.post("api/refunds", dto, {
                headers: headers,
            });
            console.log("create refund success", res.data);
            return res.data;
        } catch (error) {
            console.log(error, "error in the create refund ");
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "Create refund is failed",
            );
        }
    },
);
export const getAllRefund = createAsyncThunk(
    "/refund/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();
            const res = await api.get("api/refunds", {
                headers: headers,
            });
            console.log("get ALL refund success", res.data);
            return res.data;
        } catch (error) {
            console.log(error, "error in the get ALL  refund ");
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "get ALL refund is  failed",
            );
        }
    },
);
export const getRefundsByCashier = createAsyncThunk(
    "/refund/getByCashier",
    async (cashierId, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();
            const res = await api.get(`api/refunds/cashier/${cashierId}`, {
                headers: headers,
            });
            console.log("get refund by cashier success", res.data);
            return res.data;
        } catch (error) {
            console.log(error, "error  refund by cashier  ");
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "  failed to refund by cashier ",
            );
        }
    },
);
export const getRefundsByBranch = createAsyncThunk(
    "/refund/getByBranch",
    async (branchId, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();
            const res = await api.get(`api/refunds/branch/${branchId}`, {
                headers: headers,
            });
            console.log("get refunds by branch is success", res.data);
            return res.data;
        } catch (error) {
            console.log(error, "error  refunds by branch  ");
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "  failed to refunds by branch",
            );
        }
    },
);
export const getRefundsByShift = createAsyncThunk(
    "/refund/getByShift",
    async (shiftReportId, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();
            const res = await api.get(`api/refunds/shift/${shiftReportId}`, {
                headers: headers,
            });
            console.log("get refunds by shift is success", res.data);
            return res.data;
        } catch (error) {
            console.log(error, "error  refunds by shift  ");
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "  failed to refunds by shift",
            );
        }
    },
);
export const getRefundsByCashierAndDateRange = createAsyncThunk(
    "/refund/getByCashierAndDateRang",
    async ({ cashierId, from, to }, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();
            const formattedFrom = encodeURIComponent(from);
            const formattedFTo = encodeURIComponent(to);
            const res = await api.get(
                `api/refunds/cashier/${cashierId}/range?from=${formattedFrom}&to=${formattedFTo}`,
                {
                    headers: headers,
                },
            );
            console.log("get by date range success", res.data);
            return res.data;
        } catch (error) {
            console.log(error, "error  by date range  ");
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "  failed by date range ",
            );
        }
    },
);

export const getRefundById = createAsyncThunk(
    "/refund/getById",
    async (refundId, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();
            const res = await api.get(`api/refunds/${refundId}`, {
                headers: headers,
            });
            console.log("get refunds by id  is success", res.data);
            return res.data;
        } catch (error) {
            console.log(error, "error  refunds by id  ");
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "  failed to refunds by id",
            );
        }
    },
);