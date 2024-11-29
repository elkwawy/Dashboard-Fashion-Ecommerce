import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from 'axios';

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
    }
})

export default productSlice.reducer
export const { setPage } = productSlice.actions;
