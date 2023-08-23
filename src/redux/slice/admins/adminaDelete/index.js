import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../../api/Api.jsx";

export const AdminDeletId = createAsyncThunk( "AdminDeletId",
  async (payload) => {
    try {
      const response = await instance.delete(`custom-admin/${payload}/`)
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const AdminDelet = createSlice({
  name: 'adminTypeGet',
  initialState: {
    data: [],
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(AdminDeletId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AdminDeletId.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.status = 'success';
        if (payload) {
          state.data = payload;
        }
      })
      .addCase(AdminDeletId.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export default AdminDelet.reducer;
