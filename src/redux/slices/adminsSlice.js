import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { API } from "./../../Api/Api";
import { getAuthHeader } from "./../../Auth/getAuthHeader";
import { showToast } from "../../utils/showToast";

export const getAdmins = createAsyncThunk(
  "admins/getAdmins",
  async ({ page,searchTerm }, { rejectWithValue }) => {    
    try {
      const { headers } = getAuthHeader();
      const response = await axios.get(API.getListOfUsers, {
        params: {
          role: "admin",
          page,
          limit: 6,
          search: searchTerm || undefined,
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
      const { headers } = getAuthHeader();
      await axios.delete(
        `${API.deleteUser}/${id}`,
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
  async (adminDetails, { rejectWithValue }) => {
    try {
      const { headers } = getAuthHeader();
      const response = await axios.post(
        `${API.createUser}`,
        adminDetails,
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
  async ({id, updateMe, adminDetails}, { rejectWithValue }) => {
    try {
      const { headers } = getAuthHeader();
      if (updateMe) {
        const response = await axios.put(
          `${API.updateMe}`,
          adminDetails,
          { headers }
        );
        return response.data.data;
      } else {
        const response = await axios.put(
          `${API.updateUser}/${id}`,
          adminDetails,
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
    status: "idle", // get all admins loader only !!!
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
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = "An unexpected error occurred. Please try again later.";
        }
      })
      .addCase(deleteAdmin.pending, (state, action) => {
        // Optimistically remove the admin before the API request completes
        const { id } = action.meta.arg;
        state.admins = state.admins.filter((admin) => admin._id !== id);
        state.totalAdmins -= 1;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        // If the API call succeeds, do nothing (since we already removed it)
        showToast("success", "Admin was deleted successfully")
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        // If the API call fails, restore the previous state
        showToast("error", action.payload || "Failed to delete admin")
        // Revert the deletion by re-adding the admin (re-fetching would be ideal)
        if (action.meta.arg) {
          state.admins.push(action.meta.arg);
          state.totalAdmins += 1;
        }
      })
      .addCase(addNewAdmin.fulfilled, (state, action) => {
        state.admins.push(action.payload);
        state.totalAdmins += 1;
        showToast("success", "Admin was added successfully")
      })
      .addCase(addNewAdmin.rejected, (state, action) => {
        showToast("error", action.payload || "Failed to add admin")
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.admins = state.admins.map((admin) => {
          if (admin._id === action.payload._id) {
            return action.payload;
          }
          return admin;
        });
        showToast("success", "Admin was updated successfully")
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        showToast("error", action.payload || "Failed to update admin."); // coming error or failed to update admin
      });
  },
});

export default adminsSlice.reducer;
