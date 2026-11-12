import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";

function getErrorMessage(error, fallback) {
    return error.response?.data?.message || error.message || fallback;
}

export const getUserProfile = createAsyncThunk("user/getProfile", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/api/users/profile", { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Unable to load user profile."));
    }
});

export const getUserById = createAsyncThunk("user/getById", async (userId, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/users/${userId}`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, "Unable to load user."));
    }
});

export const logout = createAsyncThunk("user/logout", async () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    return { message: "Logged out successfully." };
});
