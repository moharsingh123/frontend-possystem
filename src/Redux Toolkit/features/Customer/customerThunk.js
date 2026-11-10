import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const createCustomer= createAsyncThunk("customer/create",
    async(customerData, {rejectWithValue})=>{
        try{    
            const headers=getAuthHeader();
            const res= await api.post("api/customers", customerData,{
                headers:headers
            })
            console.log( "create customer success",res.data)
            return res.data
        }
           
        catch(error){
            console.log( "create customer error",error )
            return rejectWithValue(error.response?.data?.message || error.message ||"create customer failed")
        }   
    }
);


export const updateCustomer= createAsyncThunk("customer/update",
    async({id, customerData}, {rejectWithValue})=>{
        try{    
            const headers=getAuthHeader();
            const res= await api.put(`api/customers/${id}`, customerData,{
                headers:headers
            })
            console.log( "update customer success",res.data)
            return res.data
        }
           
        catch(error){
            console.log( "update customer error",error )
            return rejectWithValue(error.response?.data?.message || error.message ||"update customer failed")
        }   
    }
);

export const deleteCustomer= createAsyncThunk("customer/delete",
    async({id}, {rejectWithValue})=>{
        try{    
            const headers=getAuthHeader();
            const res= await api.delete(`api/customers/${id}`,{
                headers:headers
            })
            console.log( "delete customer success",res.data)
            return res.data
        }
           
        catch(error){
            console.log( "delete customer error",error )
            return rejectWithValue(error.response?.data?.message || error.message ||"delete customer failed")
        }   
    }
)
export const getCustomerById= createAsyncThunk("customer/getById",
    async({id}, {rejectWithValue})=>{
        try{    
            const headers=getAuthHeader();
            const res= await api.get(`api/customers/${id}`,{
                headers:headers
            })
            console.log( "get customer by id success",res.data)
            return res.data
        }
           
        catch(error){
            console.log( "get customer by id error",error )
            return rejectWithValue(error.response?.data?.message || error.message ||"get customer by id failed")
        }   
    }
);


export const getAllCustomer= createAsyncThunk("customer/getAll",
    async(_, {rejectWithValue})=>{
        try{    
            const headers=getAuthHeader();
            const res= await api.get(`api/customers`,{
                headers:headers
            })
            console.log( "get all customers success",res.data)
            return res.data
        }
           
        catch(error){
            console.log( "get all customers error",error )
            return rejectWithValue(error.response?.data?.message || error.message ||"get all customers failed")
        }   
    }
)

