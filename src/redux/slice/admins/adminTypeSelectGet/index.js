import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../../api/Api.jsx';

export const adminTypeGetAxsios = createAsyncThunk('authorGetFetch', async (payload) => {
    try {
        const response = await api.get(`type-admin/`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const adminTypeGet = createSlice({
    name: 'adminTypeGet',
    initialState: {
        data: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminTypeGetAxsios.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(adminTypeGetAxsios.fulfilled, (state, { payload }) => {
                state.status = 'success';
                if (payload) {
                    state.data = payload;
                }
            })
            .addCase(adminTypeGetAxsios.rejected, (state) => {
                state.status = 'error';
            });
    },
});

export default adminTypeGet.reducer;