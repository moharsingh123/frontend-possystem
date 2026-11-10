import api from "@/utils/api"
import { createAsyncThunk } from "@reduxjs/toolkit"



export const getUserProfile= createAsyncThunk("user/getProfile",
    async(token, {rejectWithValue})=>{
        try{    
            // const token= localStorage.getItem("jwt")
            const res= await api.get("api/users/profile",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log( "getUserProfile success",res.data)
            return res.data
        }catch(error){
            console.log( "getUserProfile error",error )
            return rejectWithValue(error.response?.data?.message || error.message ||"getUserProfile failed")
        }   
    }
)

export const getAllCustomers= createAsyncThunk("user/getCustomers",
    async(token, {rejectWithValue})=>{
        try{    
            // const token= localStorage.getItem("jwt")
            const res= await api.get("api/users/customer",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log( "getAllCustomers success",res.data)
            return res.data
        }
           
        catch(error){
            console.log( "getAllCustomers error",error )
            return rejectWithValue(error.response?.data?.message || error.message ||"getAllCustomers failed")
        }   
    }
)


export const getAllCashier= createAsyncThunk("user/getCashiers",
    async(token, {rejectWithValue})=>{
        try{    
            // const token= localStorage.getItem("jwt")
            const res= await api.get("api/users/cashier",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log( "get Cashier success",res.data)
            return res.data
        }
           
        catch(error){
            console.log( "get ALL cashier error",error )
            return rejectWithValue(error.response?.data?.message || error.message ||"get ALL cashier failed")
        }   
    }
)
export const getUserById= createAsyncThunk("user/getById",
    async(userId, {rejectWithValue})=>{
        try{    
            // const token= localStorage.getItem("jwt")
            const res= await api.get(`api/users/${userId}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`
                }
            })
            console.log( "get user by id success",res.data)
            return res.data
        }
           
        catch(error){
            console.log( "get user by id error",error )
            return rejectWithValue(error.response?.data?.message || error.message ||"get user by id failed")
        }   
    }
)
export const logout= createAsyncThunk("user/logout",
    async(_, {rejectWithValue})=>{
        try{    
            localStorage.removeItem("jwt")
            console.log( "logout success")
            return {message:"logout success"}
        }
           
        catch(error){
            console.log( "fail to logout",error )
            return rejectWithValue(error.response?.data?.message || error.message ||"logout failed")
        }   
    }
)