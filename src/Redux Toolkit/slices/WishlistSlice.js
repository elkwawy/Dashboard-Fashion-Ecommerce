import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import toast from 'react-hot-toast';




export const addToWhishList = createAsyncThunk(
  "wishlist/addToWhishList", 
  async ({ id }, { rejectWithValue }) => {
    let toastid;
    try {
      const options = {
        method: "POST",
        url: `https://ecommerce-dot-code.vercel.app/api/wishlist`,
        data: {
          productId: id,
        },
        headers: {
            authorization: Cookies.get("token")
        }
      };
      
      toastid = toast.loading("waiting...");
      const { data } = await axios.request(options);
      toast.dismiss(toastid)
      toast.success('Product added to wishlist')  
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Request failed");
    }
  }
);


export const getUserWhishList = createAsyncThunk(
  "userwhishlist/getUserWhishList", 
  async () => {
    try {
      const options = {
        method: "GET",
        url: "https://ecommerce-dot-code.vercel.app/api/wishlist",
        headers: {
            authorization: Cookies.get("token")
        }
        
      };
      
      const { data } = await axios.request(options);
      console.log(data);
      return data;

    } catch (error) {
      return (error.response?.data || "Request failed");
    }
  }
);



  




const wishListSlice = createSlice({
  
  name: "wishlist", 
  initialState: {
    wishListItems: [],
    isLoading: false, 
    isError: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWhishList.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(addToWhishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishListItems.push(action.payload);
        
      })
      .addCase(addToWhishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || "Something went wrong";
      });

      builder
       .addCase(getUserWhishList.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
          state.error = null;

        })
       .addCase(getUserWhishList.fulfilled, (state, action) => {
          state.isLoading = false;
          state.wishListItems = action.payload.data || []
        })
       .addCase(getUserWhishList.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload || "Something went wrong";
        });

        
       
  },
});

export default wishListSlice.reducer;