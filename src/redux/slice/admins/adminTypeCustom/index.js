import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../../api/Api.jsx';

export const adminCustomGetAxios = createAsyncThunk('adminCustomGetAxios', async (payload) => {
    try {
        const response = await api.get(`custom-admin/`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const adminCustomGet = createSlice({
    name: 'adminCustomGetAxios',
    initialState: {
        data: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminCustomGetAxios.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(adminCustomGetAxios.fulfilled, (state, { payload }) => {
                state.status = 'success';
                if (payload) {
                    state.data = payload;
                }
            })
            .addCase(adminCustomGetAxios.rejected, (state) => {
                state.status = 'error';
            });
    },
});

export default adminCustomGet.reducer;