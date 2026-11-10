import api from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export  const signup = createAsyncThunk("auth/signup",
    async(userData , {rejectWithValue})=>{
        try{
            const res= await api.post("/auth/signup", userData)
            localStorage.setItem("jwt", res.data.jwt)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            return res.data
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message || "Signup failed")
        }
    }    
)


export  const login = createAsyncThunk("auth/login",
    async(loginData , {rejectWithValue})=>{
        try{
            const res= await api.post("/auth/login", loginData)
            localStorage.setItem("jwt", res.data.jwt)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            return res.data
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message || "Login failed")
        }
    }    
)