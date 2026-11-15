import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";
import { createAsyncThunk } from "@reduxjs/toolkit";




export const createProduct = createAsyncThunk(
    "/product/create",
    async ({ dto }, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();

            const res = await api.post(
                `/api/products`,
                dto,
                {
                    headers: headers,
                },
            );
            console.log("create product successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " create product is failed",
            );
        }
    },
);
export const getProductById = createAsyncThunk(
    "/product/getById",
    async ({id}, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();

            const res = await api.get(
                `/api/products/${id}`,
                {
                    headers: headers,
                },
            );
            console.log("get product successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " get product is failed",
            );
        }
    },
);

export const updateProduct = createAsyncThunk(
    "/product/update",
    async ({id, dto}, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();

            const res = await api.patch(
                `/api/products/${id}`,
                dto,
                {
                    headers: headers,
                },
            );
            console.log("update product successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "update  product is failed",
            );
        }
    },
);

export const deleteProduct= createAsyncThunk(
    "/product/delete",
    async ({id}, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();

            await api.delete(
                `/api/products/${id}`,
                {
                    headers: headers,
                },
            );
            console.log("delete product successfully", res.data);
            return id;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "delete product is failed",
            );
        }
    },
);

export const getProductsByStore= createAsyncThunk(
    "/product/getByStore",
    async ({storeId}, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();

            const res = await api.get(
                `/api/products/store/${storeId}`,
                {
                    headers: headers,
                },
            );
            console.log("get store product successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "get store product is failed",
            );
        }
    },
);

export const searchProducts= createAsyncThunk(
    "/product/search",
    async ({storeId , query}, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();

            const res = await api.get(
                `/api/products/store/${storeId}/search`,
                {
                    headers: headers,
                    params: { keyword: query },
                },
            );
            console.log("search  product successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    "search product is failed",
            );
        }
    },



);


