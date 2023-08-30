import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api/Api";

export const GetAttandance = createAsyncThunk(
  "GetAttendance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("davomat/?type=employer");
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response ? err.response.data : "Inernet Muammosi"
      );
    }
  }
);

const Attendence = createSlice({
  name: "getAttendance",
  initialState: {
    data: [],
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAttandance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetAttandance.fulfilled, (state, { payload }) => {
        state.status = "success";
        if (payload) {
          state.data = payload;
        }
      })
      .addCase(GetAttandance.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default Attendence.reducer;
