import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBranch= createAsyncThunk("/branch/create",
    async({dto }, {rejectWithValue})=>{
        try {
            const headers = getAuthHeader();

            const res = await api.post(`/api/branches/`, dto,{
                headers: headers,
            });
            console.log("create branch successfully" , res.data)
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " create branch  is failed",
            );
        }

    }
);


export const getBranchById= createAsyncThunk("/branch/getById",
    async({id }, {rejectWithValue})=>{
        try {
            const headers = getAuthHeader();

            const res = await api.get(`/api/branches/${id}`,{
                headers: headers,
            });
            console.log("get branch id successfully" , res.data)
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " get branch id is failed",
            );
        }

    }
)

export const getAllBranchesByStore= createAsyncThunk("/branch/getAllByStore",
    async({id }, {rejectWithValue})=>{
        try {
            const headers = getAuthHeader();

            const res = await api.get(`/api/branches/store/${id}`,{
                headers: headers,
            });
            console.log("get ALL branch by Store successfully" , res.data)
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " get ALL branch by Store is failed",
            );
        }

    }
)
export const updateBranch= createAsyncThunk("/branch/update",
    async({id , dto }, {rejectWithValue})=>{
        try {
            const headers = getAuthHeader();

            const res = await api.put(`/api/branches/${id}`, dto,{
                headers: headers,
            });
            console.log("Update branch successfully" , res.data)
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " Update branch is failed",
            );
        }

    }
)
export const deleteBranch= createAsyncThunk("/branch/delete",
    async({ id }, {rejectWithValue})=>{
        try {
            const headers = getAuthHeader();

            await api.delete(`/api/branches/${id}`, {
                headers: headers,
            });
            return id;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " Delete branch is failed",
            );
        }

    }
)