import axios from "axios";
import { API } from '../../Api/Api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getSubcategoryProducts = createAsyncThunk(
    'subcategory/getSubcategoryProducts',
    async (id) => {
        try{
            const response = await axios.get(API.getSpecificSubcategory(id));
            if (response && response.data && response.data.data.SubCategoryProducts)
                return response.data.data.SubCategoryProducts;
        }catch (err) { 
            return err ;
        }
        return [];
    }
);

export const getAllProducts = createAsyncThunk(
    'subcategory/getAllProducts',
    async (categoryID) => {

        

        const response = await axios.get(API.getAllSubcategoriesForSpecificCategory(categoryID),{
            params:{
                limit: 10, 
            }
        })


        if (response && response.data && response.data.data) { 
            const products = response.data.data.reduce((allProducts, subcat) => {
                if (subcat.SubCategoryProducts) {
                    return [...allProducts, ...subcat.SubCategoryProducts];
                }
                return allProducts;
            }, []);
            return products;
        }
        return [] ;
    }
);

const getSubcatProducts = createAsyncThunk(
    'subcategory/getSubcatProducts',
    async (page, subcatId) => {
        const response = await axios.get(API.getSpecificSubcategory(subcatId), {
            params:{
                limit: 3, // 3 products for each subcategory
                page: page,
            }
        });

    }
)


const subcategorySlice = createSlice({
    name: 'subcategory',
    initialState: {
        products: [], 
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getSubcategoryProducts.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(getSubcategoryProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
        })
        .addCase(getSubcategoryProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || "An error occurred";
        })
        .addCase(getAllProducts.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
        })
        .addCase(getAllProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || "An error occurred";
        });
    },
});

export default subcategorySlice.reducer;