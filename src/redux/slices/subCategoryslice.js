import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const spicificSubcategory = createAsyncThunk(
  "subCategory/spicificSubcategory",
  async ({ id }) => {
    const options = {
      method: "GET",
      url: `https://ecommerce-dot-code.vercel.app/api/subcategory/${id}`,
    };
    try {
      const response = await axios.request(options);
      return response.data.data;
    } catch (error) {
      console.log(response.data.data.massage);
    }
  }
);

const subCtegoryslice = createSlice({
  name: "subCategory",
  initialState: {
    subCategory: {},
    loading: false,
    error: null,
  },
  reducers: {},
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
        state.error = action.error;
      });
  },
});
