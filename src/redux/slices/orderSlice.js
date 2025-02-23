import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../Api/Api";
import  Cookies  from "js-cookie"


export const getAllOrders = createAsyncThunk(
    "order/getAllOrders",
    async (_, { rejectWithValue }) => {
      try {
        const token = Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null;
  
        if (!token) {
          throw new Error("No authentication token found.");
        }
  
        const response = await axios.get(`https://ecommerce-dot-code.vercel.app/api/order/all`, {
          headers: {
            Authorization: token,
          },
        });
  
        return response.data;
      } catch (error) {
        console.error("Error fetching orders:", error);
        return rejectWithValue(error.response?.data || "Failed to fetch orders");
      }
    }
  );
  



const orderSlice =createSlice({
    name:"order",
    initialState:{
        orders:[],
        order:null,
        setPage:1,
        loading:false,
        error:null,
    },
    reducers:{
        setPage:(state,action)=>{
          state.setPage = action.payload;
        },

    },
    extraReducers:(builder)=>{
        builder
       .addCase(getAllOrders.pending,(state)=>{
        state.loading = true
        state.error = null
       })
       .addCase(getAllOrders.fulfilled,(state,action)=>{
        state.loading = false
        state.orders = action.payload.orders
       })
       .addCase(getAllOrders.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
       })
        
    }
})

export const { setPage } = orderSlice.actions;
export default orderSlice.reducer