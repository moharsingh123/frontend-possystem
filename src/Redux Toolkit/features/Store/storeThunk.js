import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const createStore = createAsyncThunk(
    "/store/create",
    async ({ storeData }, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();

            const res = await api.post(
                `/api/stores`,
                storeData,
                {
                    headers: headers,
                },
            );
            console.log("create Store successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " create Store  is failed",
            );
        }
    },
);

export const getStoreById = createAsyncThunk(
    "/store/getById",
    async ({ id }, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();

            const res = await api.get(
                `/api/stores/${id}`,
                
                {
                    headers: headers,
                },
            );
            console.log("get Store successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " get Store  is failed",
            );
        }
    },
);
export const getAllStores = createAsyncThunk(
    "/store/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();

            const res = await api.get(
                `/api/stores`,
                
                {
                    headers: headers,
                },
            );
            console.log("get all Store successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " get all Store  is failed",
            );
        }
    },
);

export const updateStore = createAsyncThunk(
    "/store/update",
    async ({id ,storeData}, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();
            const res = await api.put(
                `/api/stores/${id}`,
                storeData,
                {
                    headers: headers,
                    
                },
            );
            console.log("update Store successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " update Store  is failed",
            );
        }
    },
);
export const getStoreByAdmin = createAsyncThunk(
    "/store/getByAdmin",
    async (_, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();
            const res = await api.get(
                `/api/stores/admin`,
                
                {
                    headers: headers,
                    
                },
            );
            console.log("get Admin  Store successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " get Admin Store  is failed",
            );
        }
    },
);
export const getStoreByEmployee = createAsyncThunk(
    "/store/getByEmployee",
    async (_, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();
            const res = await api.get(
                `/api/stores/employee`,
                {
                    headers: headers,
                    
                },
            );
            console.log("get employee Store successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " get employee Store  is failed",
            );
        }
    },
);

export const moderateStore = createAsyncThunk(
    "/store/moderateStore",
    async ({ storeId, status }, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();
            const res = await api.put(
                `/api/stores/${storeId}/moderate`,
                null,
                {
                    headers: headers,
                    params: { status }
                },
            );
            console.log("moderate Store successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " gmoderate Store  is failed",
            );
        }
    },
);


