import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../../api/Api.jsx";

export const StudentDeletId = createAsyncThunk("StudentDeletId",
    async (payload) => {
        try {
            const response = await instance.delete(`student/${payload}/`)
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

const StudentDeletDistpach = createSlice({
    name: 'adminTypeGet',
    initialState: {
        data: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(StudentDeletId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(StudentDeletId.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.status = 'success';
                if (payload) {
                    state.data = payload;
                }
            })
            .addCase(StudentDeletId.rejected, (state) => {
                state.status = 'error';
            });
    },
});

export default StudentDeletDistpach.reducer;
