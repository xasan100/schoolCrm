import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../../../api/Api.jsx';

export const permissionGetAdmin = createAsyncThunk('permissionGetAdmin', async (payload) => {
    try {
        const response = await api.get(`permission-admin/`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const permissionGet = createSlice({
    name: 'permissionGet',
    initialState: {
        data: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(permissionGetAdmin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(permissionGetAdmin.fulfilled, (state, { payload }) => {
                state.status = 'success';
                if (payload) {
                    state.data = payload;
                }
            })
            .addCase(permissionGetAdmin.rejected, (state) => {
                state.status = 'error';
            });
    },
});

export default permissionGet.reducer;