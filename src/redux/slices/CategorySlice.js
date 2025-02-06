import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAlcategories = createAsyncThunk("getAlcategories", async () => {
  const options = {
    method: "GET",
    url: "https://ecommerce-dot-code.vercel.app/api/category",
  };
  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.log(response.data.data.massage);
  }
});

export const specificCategory = createAsyncThunk(
  "specificCategory",
  async ({ id }) => {
    const options = {
      method: "GET",
      url: `https://ecommerce-dot-code.vercel.app/api/category/${id}/subcategories`,
    };
    try {
      const response = await axios.request(options);
      return response.data.data;
    } catch (error) {
      console.log(response.data.data.massage);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
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
  extraReducers: (builder) => {
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
      });
  },
});
export default categorySlice.reducer;
export const { setId } = categorySlice.actions;
