import api from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

function saveAuthSession(data) {
    const token = typeof data?.jwt === "string"
        ? data.jwt.replace(/^Bearer\s*/i, "").trim()
        : "";
    if (!token) {
        throw new Error("The server did not return a valid sign-in token.");
    }

    localStorage.setItem("jwt", token);
    localStorage.setItem("user", JSON.stringify(data.user));
}

export  const signup = createAsyncThunk("auth/signup",
    async(userData , {rejectWithValue})=>{
        try{
            const res= await api.post("/auth/signup", userData)
            saveAuthSession(res.data);
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
            saveAuthSession(res.data);
            return res.data
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message || "Login failed")
        }
    }    
)