import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createStoreEmployee = createAsyncThunk(
    "/employee/createStoreEmployee",
    async ({ employee, storeId }, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();

            const res = await api.post(
                `/api/employees/store/${storeId}`,
                employee,
                {
                    headers: headers,
                },
            );
            console.log("create Store Employee successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " create Store Employee  is failed",
            );
        }
    },
);

export const createBranchEmployee = createAsyncThunk(
    "/employee/createBranchEmployee",
    async ({ employee, branchId }, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();

            const res = await api.post(
                `/api/employees/branch/${branchId}`,
                employee,
                {
                    headers: headers,
                },
            );
            console.log("create branch Employee successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " create branch Employee  is failed",
            );
        }
    },
);

export const updateEmployee = createAsyncThunk(
    "/employee/updateEmployee",
    async ({ employeeId, employeeDetails }, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();

            const res = await api.put(
                `/api/employees/${employeeId}`,
                employeeDetails,
                {
                    headers: headers,
                },
            );
            console.log("update  Employee successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " update  Employee  is failed",
            );
        }
    },
);
export const deleteEmployee = createAsyncThunk(
    "/employee/deleteEmployee",
    async ({ employeeId }, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();

            const res = await api.delete(
                `/api/employees/${employeeId}`,
                
                {
                    headers: headers,
                },
            );
            console.log("delete   Employee successfully", res.data);
            return employeeId;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " delete af  Employee  is failed",
            );
        }
    },
);
export const findEmployeeById = createAsyncThunk(
    "/employee/ findEmployeeById",
    async ({ employeeId }, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();

            const res = await api.get(
                `/api/employees/${employeeId}`,
                
                {
                    headers: headers,
                },
            );
            console.log(" find Employee  By Id successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " find Employee  By Id  is failed",
            );
        }
    },
);
export const findStoreEmployees = createAsyncThunk(
    "/employee/ findStoreEmployees",
    async ({ storeId }, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();

            const res = await api.get(
                `/api/employees/store/${storeId}`,
                
                {
                    headers: headers,
                },
            );
            console.log(" find Store  Employee  by id  successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " find Store  Employee   is failed",
            );
        }
    },
);
export const findBranchEmployees = createAsyncThunk(
    "/employee/ findBranchEmployees",
    async ({ branchId }, { rejectWithValue }) => {
        try {
            const headers = getAuthHeader();

            const res = await api.get(
                `/api/employees/branch/${branchId}`,
                
                {
                    headers: headers,
                },
            );
            console.log(" find branch Employee  successfully", res.data);
            return res.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " find branch Employee   is failed",
            );
        }
    },
);
