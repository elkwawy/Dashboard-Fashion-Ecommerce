import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const loginUser = createAsyncThunk('user/loginUser', async ( {email, password}) => {
    
    const response = await axios.post("https://ecommerce-dot-code.vercel.app/api/auth/login", {"email": email, "password": password});
    if (response.data.role !== "admin") {
        return response.data;
    }
    const token = response.data.token;
    Cookies.set( "token", token, {expires: 7});
    localStorage.setItem("user", JSON.stringify(response.data)); 
    return response.data;
});

export const logUserOut = createAsyncThunk('user/logUserOut', async ( ) => {
    Cookies.remove("token");
    localStorage.removeItem("user"); 
    window.location.reload();
    return null;
});


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user:  JSON.parse(localStorage.getItem("user")) || null,
        status: "idle",
        error: null,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        // Login user
        .addCase(loginUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = "succeeded";
            
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = "failed";
            if (action.error.message == "Request failed with status code 401") { 
                state.error = "Wrong email or password";
            }
            else
                state.error = action.error.message;
        })
        .addCase(logUserOut.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(logUserOut.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = "succeeded";
            
        })
        .addCase(logUserOut.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;