// External libraries
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Local imports
import { instance } from "../../../api/Api";

// Asynchronous action to fetch teachers
export const fetchTeachers = createAsyncThunk(
  "teachers/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("teacher/");
      return response.data;
    } catch (err) {
      // Return more descriptive error messages
      const errorMessage = err.response
        ? err.response.data
        : "Internet connection problem";
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice for teachers
const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    data: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, { payload }) => {
        state.status = "success";
        if (payload) {
          state.data = payload;
        }
      })
      .addCase(fetchTeachers.rejected, (state, { payload }) => {
        state.status = "error";
        // Optionally, you can store the error message in the state
        state.error = payload;
      });
  },
});

// Export the reducer
export default teachersSlice.reducer;
