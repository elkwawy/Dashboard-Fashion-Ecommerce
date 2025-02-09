import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { API } from "./../../Api/Api";
import { getAuthHeader } from "./../../Auth/getAuthHeader";
const { headers } = getAuthHeader() ? getAuthHeader() : {};

export const getAdmins = createAsyncThunk(
  "admins/getAdmins",
  async ({ page, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(API.getListOfUsers, {
        params: {
          role: "admin",
          page,
          limit: 7,
        },
        headers,
      });
      return response.data;
    } catch (error) {
      // Use rejectWithValue to pass a custom error message or error object
      if (error.response) {
        // Server responded with a status code other than 2xx
        return rejectWithValue(
          error.response.data || error.response.statusText
        );
      } else if (error.request) {
        // Request was made but no response received
        return rejectWithValue("Network error");
      } else {
        // Other errors (e.g., setting up the request)
        return rejectWithValue(error.message || "An unknown error occurred.");
      }
    }
  }
);
export const deleteAdmin = createAsyncThunk(
  "admins/deleteAdmin",
  async ({ id, currentUser }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://ecommerce-dot-code.vercel.app/api/user/${id}`,
        {
          headers,
        }
      );

      // If the deleted user is the current user, log them out
      if (id === currentUser._id) {
        // remove token and forward to login page
        Cookies.remove("token");
        window.location.href = "/";
      }

      return id; // Return the id to filter it from the list of admins
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data || error.response.statusText
        );
      } else if (error.request) {
        return rejectWithValue("Network error");
      } else {
        return rejectWithValue(error.message || "An unknown error occurred.");
      }
    }
  }
);

export const addNewAdmin = createAsyncThunk(
  "admins/addNewAdmin",
  async ({ name, email, password, passwordConfirm }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://ecommerce-dot-code.vercel.app/api/user`,
        {
          name,
          email,
          password,
          passwordConfirm,
          role: "admin",
        },
        { headers }
      );
      return response.data.data;
    } catch (error) {
      // Handle specific API error messages
      if (error.response) {
        const apiError =
          error.response.data.errors?.[0]?.msg || "Server error occurred";
        return rejectWithValue(apiError);
      }

      // Handle other errors like network issues
      return rejectWithValue(error.message || "Unexpected error occurred");
    }
  }
);
export const updateAdmin = createAsyncThunk(
  "admins/updateAdmin",
  async ({ id, name, email, currentUser }, { rejectWithValue }) => {
    try {
      if (currentUser._id === id) {
        const response = await axios.put(
          `https://ecommerce-dot-code.vercel.app/api/user/updateMe`,
          {
            name,
            email,
            role: "admin",
          },
          { headers }
        );
        return response.data.data;
      } else {
        const updateData = { name }; // Start with just the name to update

        // If the email is different, include it
        if (email) {
          updateData.email = email;
        }
        updateData.role = "admin";
        const response = await axios.put(
          `https://ecommerce-dot-code.vercel.app/api/user/${id}`,
          updateData,
          {
            headers,
          }
        );
        return response.data.data;
      }
    } catch (error) {
      // Handle specific API error messages
      if (error.response) {
        const apiError =
          error.response.data.errors?.[0]?.msg || "Server error occurred";
        return rejectWithValue(apiError);
      }

      // Handle other errors like network issues
      return rejectWithValue(error.message || "Unexpected error occurred");
    }
  }
);

const adminsSlice = createSlice({
  name: "admins",
  initialState: {
    admins: [],
    totalAdmins: 0,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // getAdmins List
      .addCase(getAdmins.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAdmins.fulfilled, (state, action) => {
        state.admins = action.payload.data;
        state.totalAdmins = action.payload.totalDocuments;
        state.status = "succeeded";
      })
      .addCase(getAdmins.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.payload);

        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = "An unexpected error occurred. Please try again later.";
        }
      })
      .addCase(deleteAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.admins = state.admins.filter(
          (admin) => admin._id !== action.payload
        );
        state.totalAdmins -= 1;
        state.status = "succeeded";
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An unexpected error occurred.";
      })
      .addCase(addNewAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addNewAdmin.fulfilled, (state, action) => {
        state.admins.push(action.payload);
        state.totalAdmins += 1;
        state.status = "succeeded";
      })
      .addCase(addNewAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.admins = state.admins.map((admin) => {
          if (admin._id === action.payload._id) {
            return action.payload;
          }
          return admin;
        });
        state.status = "succeeded";
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default adminsSlice.reducer;
