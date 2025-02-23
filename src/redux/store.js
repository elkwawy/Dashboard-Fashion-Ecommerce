import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productSlice from "../pages/products/productSlice";
import adminsSlice from "./slices/adminsSlice";
import categorySlice from "./slices/CategorySlice";
import subCtegoryslice from "./slices/subCategoryslice";
import orderSlice from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    products: productSlice,
    categorySlice,
    admins: adminsSlice,
    subCategory: subCtegoryslice,
    orderSlice,
  },
});

export default store;
