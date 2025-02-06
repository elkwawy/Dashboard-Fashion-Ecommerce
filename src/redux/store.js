import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

import productSlice from "./slices/productslice";
import AddproductSlice from "./slices/addProductSlice";
import categorySlice from "./slices/CategorySlice";
import adminsSlice from "./slices/adminsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    productSlice,
    AddproductSlice,
    categorySlice,
    admins: adminsSlice,
  },
});

export default store;
