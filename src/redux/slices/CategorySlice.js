import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import sweetalert from "../../utils/sweetalert";
import Cookies from "js-cookie";
import { API } from "../../Api/Api";


export const getAlcategories = createAsyncThunk(
    "getAlcategories",
    async ({ limit = 10 } = {}) => { 
      try {
        const response = await axios.get(`${API.showCategories}`, {
          params: { limit }, 
        });
        return response.data.data;
      } catch (error) {
        console.error(" Error fetching categories:", error.response?.data?.message);
        throw error;
      }
    }
  );
  


export const specificCategory = createAsyncThunk(
    "specificCategory",
    async({id})=>{
     const options ={
         method: 'GET',
         url: `https://ecommerce-dot-code.vercel.app/api/category/${id}/subcategories`,
     }
     try{
         const response = await axios.request(options)
         console.log(response.data.data);
         return response.data.data;
 
     }catch(error){
         console.log(response.data.data.massage); 
     }
 
 }
)


export const specificSpicificCategory = createAsyncThunk(
    "specificspicificCategory",
    async({id})=>{
     const options ={
         method: 'GET',
         url: `${API.showCategories}/category/${id}`,
     }
     try{
         const response = await axios.request(options)
         console.log(response.data.data);
         return response.data.data;
 
     }catch(error){
         console.log(response.data.data.massage); 
     }
 
 }
)

export const updateCategory = createAsyncThunk(
    "Category/updateCategory",
    async ({ id,name,image }, { rejectWithValue }) => {
      const token = JSON.parse(Cookies.get("token"))
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);
        try {
            const response = await axios.put(
                `${API.updateCategory}/${id}`,
                formData,
                {
                  headers: {
                    Authorization: token ,
                  },
                }
            );
            return response.data.data;

        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
);


export const AddNewcategory = createAsyncThunk(
    "Category/AddNewcategory",
    async ({ name,image }, { rejectWithValue }) => {
      const token = JSON.parse(Cookies.get("token"))
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);
        try {
            const response = await axios.post(
              `${API.addNewCategory}`,
              formData,
                {
                  headers: {
                    Authorization: token ,
                  },
                }
            );
            return response.data.data;
  
        } catch (error) {
            console.error("API Error:", error.data || error);
            console.log(token);
            return rejectWithValue(error.response);
        }
    }
  );

export const deleteCategory = createAsyncThunk(
    'Category/deleteCategory',
    async ({ id }, { rejectWithValue }) => {
      try {
        const token = JSON.parse(Cookies.get("token"))
        const options = {
          method: 'DELETE',
          url:`${API.deleteCategory}/${id}`,
          headers: {
            Authorization: token ,
          },
          
        };
        const result = await sweetalert.deleteOrNot();
        if (result.isConfirmed) {
          const response = await axios.request(options);
          sweetalert.deletedDone("subcategory deleted successfully");
          return response.data; 
        }
        return rejectWithValue("subcategory deletion canceled");
  
      } catch (error) {
        console.error('Error while deleting subcategory:', error);
        return rejectWithValue(error.message || "An unexpected error occurred");
      }
    }
  );


const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        loading: false,
        error: null,
        subCategory: [],
        subid: "",
    },
    reducers: {
        setId: (state, action) => {
            state.subid = action.payload.id;
          },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAlcategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAlcategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
            state.error = null; 

        })
        .addCase(getAlcategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
        .addCase(specificCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(specificCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.subCategory = action.payload;
            state.subid = action.payload.defaultSubid;
            state.error = null; 
            
        })
        .addCase(specificCategory.rejected, (state, action) => {
            state.loading = false;    
            state.error = action.error;
        })
        .addCase(specificSpicificCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(specificSpicificCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = [action.payload];
            state.error = null;
        })
        .addCase(updateCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
            state.categories = state.categories.map(category =>
                category._id === action.payload._id ? action.payload : category
            );
            state.loading = false;
            state.error = null;
        })
        .addCase(updateCategory.rejected, (state, action) => {
            state.loading = false; 
            state.error = action.payload || "Something went wrong"; 
        })
        .addCase(AddNewcategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(AddNewcategory.fulfilled, (state, action) => {
            state.categories.push(action.payload);
            state.loading = false;
            state.error = null;
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            const newCategories = state.categories.filter(category => category._id!== action.payload._id);
            state.categories = newCategories;
            state.error = null;
        })
        .addCase(deleteCategory.rejected, (state, action) => {
            state.error = action.error;
        })


       
    
    }
    
})
export default categorySlice.reducer
export const {setId} = categorySlice.actions
