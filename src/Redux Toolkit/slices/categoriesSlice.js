import axios from "axios";
import { API } from '../../Api/Api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        try{
            const response = await axios.get(API.getAllCategories);
            return response.data;
        }catch (err) { 
            // console.log("error");
            throw new Error('Failed to fetch categories');
        }
    }
);


const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [], 
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCategories.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.categories = action.payload.data;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || "An error occurred";
        });
    },
});

export default categorySlice.reducer;
export const allCategories = (state) => state.categories.categories;