import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../api/Api";

export const postTeacher = createAsyncThunk(
  "postTeacher",
  async (value, payload) => {
    try {
      await instance.post("teacher/", value, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      throw error.response.data;
    }
  }
);

const AddTeacher = createSlice({
  name: "addTeacher",
  initialState: {
    data: [],
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postTeacher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postTeacher.fulfilled, (state, { payload }) => {
        state.status = "success";
        if (payload) {
          state.data = payload;
        }
      })
      .addCase(postTeacher.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default AddTeacher.reducer;
