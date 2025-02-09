import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice"
import productSlice from "./slices/productslice"
import AddproductSlice from "./slices/addProductSlice"
import categorySlice from "./slices/CategorySlice"
import subCtegoryslice from "./slices/subCategoryslice";


const store = configureStore({
    reducer: {
        user:userSlice,
        productSlice,
        AddproductSlice,
        categorySlice,
        subCategory: subCtegoryslice
    }
}
)

export default store;