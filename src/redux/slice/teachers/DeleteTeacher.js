import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../api/Api";
import { toast } from "react-toastify";

export const deleteTeacher = createAsyncThunk(
  "deleteTeacher",
  async (id, { rejectWithValue }) => {
    try {
      await instance.delete(`teacher/${id}/`);
      toast.success("O'qituvchi muvaffaqiyatli o'chirildi");
    } catch (error) {
      toast.error("O'qituvchi o'chirishda xatolik yuz berdi");
      return rejectWithValue(
        error.response ? error.response.data : "Network error"
      );
    }
  }
);

const teacherDeletion = createSlice({
  name: "teacherDeletion",
  initialState: {
    data: [],
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteTeacher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTeacher.fulfilled, (state, { payload }) => {
        state.status = "success";
        if (payload) {
          state.data = payload;
        }
      })
      .addCase(deleteTeacher.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default teacherDeletion.reducer;
