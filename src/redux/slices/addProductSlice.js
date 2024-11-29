import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
  

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async ({product}, { rejectWithValue }) => {
      
      try {
        const formData = new FormData();

        const token = JSON.parse(Cookies.get("token"));
        console.log(token);
      if (!token) {
        throw new Error("Token is missing.");
      }
      product.images.forEach((image) => {
        formData.append('images', image);
      });
        formData.append('image', product.image);
        formData.append('images', product.images)
        formData.append('name', product.name);
        formData.append('Desc', product.Desc);
        formData.append('price', product.price);
        formData.append('priceAfterDiscount', product.priceAfterDiscount);
        formData.append('soldItems', product.soldItems);
        formData.append('stock', product.stock);
        formData.append('colors', JSON.stringify(product.colors)); 
        formData.append('category', product.category);
        formData.append('SubCategory', product.SubCategory);
        formData.append('Brand', product.Brand);
        formData.append('rateavg', product.rateavg);
        formData.append('rateCount', product.rateCount);
  
        const response = await axios.post('https://ecommerce-dot-code.vercel.app/api/product',formData, {
            headers: {
                Authorization: token, 
            },
        });
        console.log("Product added successfully:");
        console.log(response.data);
        return response.data;

      } catch (error) {
        console.error('Error adding product:', error);
        return rejectWithValue(error.response?.data || error.message || 'Error adding product');
      }
    }
  );
const initialState = {
    product: null,
    loading: false,
    error: null,
  };

const addProductSlice = createSlice({
    name: 'product',
    initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload; 
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});
export default addProductSlice.reducer

