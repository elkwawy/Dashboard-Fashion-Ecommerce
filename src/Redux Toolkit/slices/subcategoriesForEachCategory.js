import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API, BASE_URL } from "../../Api/Api";
import { allCategories } from "./categoriesSlice";



export const fetchAllSubcategories = createAsyncThunk(
    'subcategories/fetchAllSubcategories',
    async (_, { getState }) => {
        
        let categories = allCategories(getState());
        
        
        if (!categories || categories.length === 0) {
            throw new Error("No categories found in state.");
        }
        
        let data = {};
        for (const category of categories) {
            
            const response = await axios.get(`${BASE_URL}/category/${category._id}/subcategories`, {
                params:{
                    limit:10,
                }
            });
            data[category.slug] = {_id: category._id, category:category.name, slug:category.slug, subcategories: [...response.data.data] };
        }
        return data;
    }
);

export const fetchSubcategoriesforSpecificCategory = createAsyncThunk(
    'subcategories/fetchSubcategoriesforSpecificCategory',
    async (id) => {
        const response = await axios.get(`${BASE_URL}/category/${id}/subcategories`);
        console.log("data : ",response.data);
        return response.data;
    }
);


const subcategorySlice = createSlice({
    name: 'subcategories',
    initialState: {
        subcategories: [], 
        allSubcategories: [], 
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSubcategoriesforSpecificCategory.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchSubcategoriesforSpecificCategory.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.subcategories = action.payload.data;
        })
        .addCase(fetchSubcategoriesforSpecificCategory.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchAllSubcategories.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAllSubcategories.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.allSubcategories = action.payload;
        })
        .addCase(fetchAllSubcategories.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'An error occurred';
        });
    },
});

export default subcategorySlice.reducer;
export const allSubcategories = (state) => state.subcategories.allSubcategories;
