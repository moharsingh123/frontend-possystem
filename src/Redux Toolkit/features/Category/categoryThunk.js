import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const createCategory= createAsyncThunk("/category/create",
    async({dto }, {rejectWithValue})=>{
        try {
            const headers = getAuthHeader();
            
            const res = await api.post(`/api/categories/`, dto,{
                headers: headers,
            });
            console.log("create category successfully" , res.data)
            return res.data;
        } catch (error) {
            console.log("error" , error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " create category  is failed",
            );
        }

    }
)


export const getCategoriesByStore= createAsyncThunk("/category/getByStore",
    async({storeId }, {rejectWithValue})=>{
        try {
            const headers = getAuthHeader();
            
            const res = await api.get(`/api/categories/store/${storeId}`,{
                headers: headers,
            });
            console.log("get category successfully" , res.data)
            return res.data;
        } catch (error) {
            console.log("error" , error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " get category  is failed",
            );
        }

    }
);

export const updateCategory= createAsyncThunk("/category/update",
    async({id , dto }, {rejectWithValue})=>{
        try {
            const headers = getAuthHeader();
            
            const res = await api.put(`/api/categories/${id}`, dto,{
                headers: headers,
            });
            console.log("update category successfully" , res.data)
            return res.data;
        } catch (error) {
            console.log("error" , error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " update  category  is failed",
            );
        }

    }
);
export const deleteCategory= createAsyncThunk("/category/delete",
    async({id  }, {rejectWithValue})=>{
        try {
            const headers = getAuthHeader();
            
            const res = await api.delete(`/api/categories/${id}`,{
                headers: headers,
            });
            console.log("delete category successfully" , res.data)
            return res.data;
        } catch (error) {
            console.log("error" , error);
            return rejectWithValue(
                error.response?.data?.message ||
                    error.message ||
                    " delete  category  is failed",
            );
        }

    }
);