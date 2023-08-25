import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../api/Api";

export const TeachersGet = createAsyncThunk("GetTeachers", async (payload) => {
  try {
    const response = await instance.get(`teacher/`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const GetTeachers = createSlice({
  name: "adminTypeGet",
  initialState: {
    data: [],
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(TeachersGet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(TeachersGet.fulfilled, (state, { payload }) => {
        state.status = "success";
        if (payload) {
          state.data = payload;
        }
      })
      .addCase(TeachersGet.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default GetTeachers.reducer;
