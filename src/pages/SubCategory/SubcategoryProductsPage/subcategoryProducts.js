import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../../Api/Api";
import { getAuthHeader } from "../../../Auth/getAuthHeader";
import { showToast } from "../../../utils/showToast";

// Fetch all products
export const getSubcategoryProducts = createAsyncThunk(
    "product/getSubcategoryProducts",
    async (subcatId,{ rejectWithValue }) => {
        try {
            const response = await axios.get(API.getSubcategoryProducts(subcatId));
            const products = response?.data?.data?.SubCategoryProducts ?? [];
            return products;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (product , { getState, rejectWithValue }) => {
        const {headers} = getAuthHeader();
        const id = product._id;
        try {
            await axios.delete(API.deleteProduct(id), {headers});
            return id;
        } catch (error) {
            console.log(error);
            const state = getState().products;
            return rejectWithValue({
                error : error.response.data.errors?.[0]?.msg || error.message || "Product deleting failed",
                rollback: [...state.products, product],
            });
        }
    }
);

const subcategoryProductsSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getSubcategoryProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getSubcategoryProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(getSubcategoryProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteProduct.pending, (state, action) => {
            state.products = state.products.filter(p => p._id !== action.meta.arg._id);
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            showToast("success", "Product was deleted successfully");
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            showToast('error', action.payload?.error);
            state.products = action.payload?.rollback || state.products;
        });
    },
});

export default subcategoryProductsSlice.reducer;
