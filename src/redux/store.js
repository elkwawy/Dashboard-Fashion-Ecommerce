import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

import productSlice from "../pages/products/productSlice";
import categorySlice from "./slices/CategorySlice";
import adminsSlice from "./slices/adminsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    products: productSlice,
    categorySlice,
    admins: adminsSlice,
  },
});

export default store;
