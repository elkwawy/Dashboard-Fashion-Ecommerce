import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from 'axios';
import { getAuthHeader } from "../../Auth/getAuthHeader";
import sweetalert from "../../utils/sweetalert";

export const allProduct = createAsyncThunk(
  'product/allProduct',
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const options = {
        method: 'GET',
        url: `https://ecommerce-dot-code.vercel.app/api/product?limit=${limit}&page=${page}&search=${search || ''}`,
      };

      const response = await axios.request(options);
      if (!response.data) {
        throw new Error('No data received');
      }
      console.log(response.data);
      return response.data; 
    } catch (error) {
     
      console.error('Error fetching products:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

 

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = JSON.parse(Cookies.get("token"))
      const options = {
        method: 'DELETE',
        url: `https://ecommerce-dot-code.vercel.app/api/product/${id}`,
        headers: {
          Authorization: token ,
        },
        
      };
      const result = await sweetalert.deleteOrNot();
      if (result.isConfirmed) {
        const response = await axios.request(options);
        sweetalert.deletedDone("Product deleted successfully");
        return response.data; 
      }
      return rejectWithValue("Product deletion canceled");

    } catch (error) {
      console.error('Error while deleting product:', error);
      return rejectWithValue(error.message || "An unexpected error occurred");
    }
  }
);






const productSlice = createSlice({
    name:"product",
    initialState:{
        product: [],
        loading: false,
        error: null,
        currentPage: 1,
        limit: 10,

       
    },
    reducers: {
      setPage: (state, action) => {
        state.currentPage = action.payload;
      },
      
    },
    extraReducers: (builder) => {
        builder
       .addCase(allProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(allProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload
            state.error = null;
        })
        .addCase(allProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
        .addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = state.product
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
    }
})

export default productSlice.reducer
export const { setPage } = productSlice.actions;
