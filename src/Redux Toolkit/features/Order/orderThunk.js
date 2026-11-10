import api from "@/utils/api";
import { getAuthHeader } from "@/utils/getAuthHeader";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const createOrder= createAsyncThunk("order/create",
    async(dto, {rejectWithValue})=>{
        try{    
            const headers=getAuthHeader();
            const res= await api.post("api/orders", dto,{
                headers:headers
            })
            console.log( "create order success",res.data)
            return res.data
        }
           
        catch(error){
            console.log( "create order error",error )
            return rejectWithValue(error.response?.data?.message || error.message ||"create order failed")
        }   
    }
);
export const getOrderById= createAsyncThunk("order/getById",
    async(id, {rejectWithValue})=>{
        try{    
            const headers=getAuthHeader();
            const res= await api.get( `api/orders/${id}`,{
                headers:headers
            })
            console.log( "fetch order success",res.data)
            return res.data
        }
           
        catch(error){
            console.log( "fetch Order error",error?.response?.data )
            return rejectWithValue(error.response?.data?.message || error.message ||"fetch  order failed")
        }   
    }
);

export const getOrdersByBranch= createAsyncThunk("order/getByBranch",
    async({branchId, customerId, cashierId, paymentType , status}, {rejectWithValue})=>{
        try{    
            const headers=getAuthHeader();
            const param=[]
            if(customerId)param.push(`customerId=${customerId}`)
            if(cashierId)param.push(`cashierId=${cashierId}`)
            if(paymentType)param.push(`paymentType=${paymentType}`)
            if(status)param.push(`orderStatus=${status}`)

                const query = param.length? `?${param.join("&") } ` :"";
            const res= await api.get( `api/orders/branch/${branchId}${query}`,{
                headers:headers
            })
            console.log( "fetch branch order success",res.data)
            return res.data
        }
           
        catch(error){
            console.log( "fetch branch Order error",error?.response?.data )
            return rejectWithValue(error.response?.data?.message || error.message ||"fetch branch  order failed")
        }   
    }
);

export const getOrderByCashier= createAsyncThunk("order/getByCashier",
    async({id}, {rejectWithValue})=>{
        try{    
            const headers=getAuthHeader();
            
            const res= await api.get( `api/orders/cashier/${id}`,{
                headers:headers
            })
            console.log( "fetch cashier order success",res.data)
            return res.data
        }
           
        catch(error){
            console.log( "fetch cashier Order error",error?.response?.data )
            return rejectWithValue(error.response?.data?.message || error.message ||"fetch cashier  order failed")
        }   
    }
);

export const getTodayOrdersByBranch= createAsyncThunk("order/getTodayOrderByBranch",
    async({id}, {rejectWithValue})=>{
        try{    
            const headers=getAuthHeader();
            
            const res= await api.get( `api/orders/today/branch/${id}`,{
                headers:headers
            })
            console.log( "fetch today branch order success",res.data)
            return res.data
        }
           
        catch(error){
            console.log( "fetch today branch Order error",error?.response?.data )
            return rejectWithValue(error.response?.data?.message || error.message ||"fetch today branch  order failed")
        }   
    }
);

export const deleteOrder= createAsyncThunk("order/delete",
    async(id, {rejectWithValue})=>{
        try{    
            const headers=getAuthHeader();
            
            const res= await api.delete( `api/orders/${id}`,{
                headers:headers
            })
            console.log( "delete order success",res.data)
            return id
        }
           
        catch(error){
            console.log( "fetch today branch Order error",error?.response?.data )
            return rejectWithValue(error.response?.data?.message || error.message ||"delete  order failed")
        }   
    }
);
export const getOrdersByCustomer= createAsyncThunk("order/getByCustomer",
    async(id, {rejectWithValue})=>{
        try{    
            const headers=getAuthHeader();
            
            const res= await api.get( `api/orders/customer/${id}`,{
                headers:headers
            })
            console.log( "customer order success",res.data)
            return res.data
        }
           
        catch(error){
            console.log( "fetch customer order error",error?.response?.data )
            return rejectWithValue(error.response?.data?.message || error.message ||"customer order failed")
        }   
    }
);

export const getRecentOrdersByBranch= createAsyncThunk("order/getRecentByBranch",
    async(id, {rejectWithValue})=>{
        try{    
            const headers=getAuthHeader();
            
            const res= await api.get( `api/orders/recent/${id}`,{
                headers:headers
            })
            console.log( "Recent order success",res.data)
            return res.data
        }
           
        catch(error){
            console.log( "fetch recent order error",error?.response?.data )
            return rejectWithValue(error.response?.data?.message || error.message ||"get Recent order by branch failed")
        }   
    }
);