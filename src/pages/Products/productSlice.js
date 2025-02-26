import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import sweetalert from "../../utils/sweetalert";
import { showToast } from "../../utils/showToast";
import { API } from "../../Api/Api";

// Fetch all products
export const allProduct = createAsyncThunk(
  "product/allProduct",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API.product}?limit=${limit}&sort=-createdAt&page=${page}&search=${search || ""}`
      );
      console.log("1 Product", response.data);
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = JSON.parse(Cookies.get("token"));
      const result = await sweetalert.deleteOrNot();
      if (!result.isConfirmed)
        return rejectWithValue("Product deletion canceled");

      await axios.delete(`${API.product}/${id}`, {
        headers: { Authorization: token },
      });
      showToast("success", "Product deleted successfully");
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    error: null,
    totalDocuments: 0,
    currentPage: 1,
    limit: 10,
    loading: false,
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
        state.products = action.payload.data;
        state.totalDocuments = action.payload.totalDocuments;
      })
      .addCase(allProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
export const { setPage } = productSlice.actions;
