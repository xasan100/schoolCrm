import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../../api/Api.jsx';

export const StudentsGet = createAsyncThunk('StudentsGet', async (payload) => {
    try {
        const response = await instance.get(`student/`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const StudentsGetDispatch = createSlice({
    name: 'adminTypeGet',
    initialState: {
        data: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(StudentsGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(StudentsGet.fulfilled, (state, { payload }) => {
                state.status = 'success';
                if (payload) {
                    state.data = payload;
                }
            })
            .addCase(StudentsGet.rejected, (state) => {
                state.status = 'error';
            });
    },
});

export default StudentsGetDispatch.reducer;