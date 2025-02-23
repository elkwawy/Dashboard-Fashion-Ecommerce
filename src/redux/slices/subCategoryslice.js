import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import sweetalert from "../../utils/sweetalert";
import { API } from "../../Api/Api";

const token = JSON.parse(Cookies.get("token"))

export const spicificSubcategory = createAsyncThunk(
  "subCategory/spicificSubcategory",
  async ({ id, page , limit }, { rejectWithValue }) => {
    const options = {
      method: "GET",
      url: `http://ecommerce-dot-code.vercel.app/api/category/${id}/subcategories?&page=${page}`,
      params: { page,limit },
      
    }

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);


export const onespicificSubcategory = createAsyncThunk(
    "subCategory/onespicificSubcategory",
    async ({ id }, { rejectWithValue }) => {
      const options = {
        method: "GET",
        url: `${API.showSubCategories}/${id}`,
      };
      try {
        const response = await axios.request(options);
        return response.data.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Something went wrong");
      }
    }
  );


  export const updatespicificSubcategory = createAsyncThunk(
    "subCategory/updatespicificSubcategory",
    async ({ id, name }, { rejectWithValue }) => {
      const token = JSON.parse(Cookies.get("token"))
        try {
            const response = await axios.put(
                `${API.updateSubCategory}/${id}`,
                { name },
                {
                  headers: {
                    Authorization: token ,
                  },
                }
            );
            return response.data.data;

        } catch (error) {
            console.error("❌ API Error:", error.data || error);
            console.log(token);
            return rejectWithValue(error.response);
        }
    }
);

export const AddNewSubcategory = createAsyncThunk(
  "subCategory/AddNewSubcategory",
  async ({ name,category }, { rejectWithValue }) => {
    const token = JSON.parse(Cookies.get("token"))
      try {
          const response = await axios.post(
            `${API.addNewSubCategory}`,
              { name,category },
              {
                headers: {
                  Authorization: token ,
                },
              }
          );
          return response.data.data;

      } catch (error) {
          console.error("❌ API Error:", error.data || error);
          console.log(token);
          return rejectWithValue(error.response);
      }
  }
);


export const deletesubCategory = createAsyncThunk(
    'subCategory/deletesubCategory',
    async ({ id }, { rejectWithValue }) => {
      try {
        const token = JSON.parse(Cookies.get("token"))
        const options = {
          method: 'DELETE',
          url:`${API.deleteSubCategory}/${id}`,
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




const subCategorySlice = createSlice({
  name: "subCategory",
  initialState: {
    subCategory: [],
    currentPage: 1,
    limit:5,
    loading: false,
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(spicificSubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(spicificSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategory = action.payload;
        state.error = null;
      })
      .addCase(spicificSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch subcategory";
      })
      .addCase(updatespicificSubcategory.fulfilled, (state, action) => {
        state.subCategory = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updatespicificSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update subcategory";
      })
      .addCase(AddNewSubcategory.fulfilled, (state, action) => {
        state.subCategory.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(AddNewSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add subcategory";
      })
      .addCase(deletesubCategory.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deletesubCategory.fulfilled, (state, action) => {
        state.subCategory = state.subCategory.filter(subCate => subCate._id !== action.meta.arg.id);
        state.error = null;
    })
      .addCase(onespicificSubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(onespicificSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategory = [action.payload];
        state.error = null;
      })

  },
});
export const { setPage } = subCategorySlice.actions;
export default subCategorySlice.reducer;
