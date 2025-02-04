import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice"
import adminsSlice from "./slices/adminsSlice"

const store = configureStore({
    reducer: {
        user:userSlice,
        admins: adminsSlice
    }
}
)

export default store;