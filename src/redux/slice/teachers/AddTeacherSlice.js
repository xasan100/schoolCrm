import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../api/Api";
import { toast } from "react-toastify";

export const postTeacher = createAsyncThunk(
  "postTeacher",
  async (value, { rejectWithValue }) => {
    try {
      const postResponse = await instance.post("teacher/", value, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (postResponse && postResponse.status === 201) {
        toast.success("O'qtuvchi qo'shildi");
      } else {
        toast.error("O'qtuvchi qo'shilmdi");
        return rejectWithValue("O'qituvchi qo'shishda xatolik yuz berdi");
      }
    } catch (err) {
      toast.error("O'qtuvchi qo'shilmdi");
      return rejectWithValue(
        err.response ? err.response.data : "Network error"
      );
    }
  }
);

const AddTeacherSlice = createSlice({
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
          state.data.push(payload);
        }
      })
      .addCase(postTeacher.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default AddTeacherSlice.reducer;
