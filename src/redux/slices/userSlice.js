import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { API } from "../../Api/Api";

export const loginUser = createAsyncThunk('user/loginUser', async ( {email, password, remember}) => {
    
    const response = await axios.post("https://ecommerce-dot-code.vercel.app/api/auth/login", {"email": email, "password": password});
    if (response) { 
        if (response.data.role !== "admin") {
            return response.data;
        }
        // if u click remember me it stores data for 7 days 
        // else it stores data for 1 day
        const cookieOptions = remember ? { secure: true, sameSite: 'Strict', expires: 7 } : { secure: true, sameSite: 'Strict', expires: 1 };
        Cookies.set("token", JSON.stringify(response.data.token), cookieOptions);
        return response.data;
    }
    return null ;
});

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', async (token, thunkAPI) => {
    try {
        const response = await axios.get(`https://ecommerce-dot-code.vercel.app/api/user/getMe`, {
            headers: {
                Authorization: token, // Ensure the token is prefixed with "Bearer"
            },
        });

        return response.data.data; // Return the user data to Redux
    } catch (error) {
        console.error('Error in getCurrentUser:', error.message);

        // Log detailed error info
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }

        // Reject with a meaningful error message
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || 'Failed to fetch user data'
        );
    }
});

export const logUserOut = createAsyncThunk('user/logUserOut', async ( ) => {
    Cookies.remove("token"); 
    window.location.reload();
    return null;
});




const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
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
        .addCase(getCurrentUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(getCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = "succeeded";
            
        })
        .addCase(getCurrentUser.rejected, (state, action) => {
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