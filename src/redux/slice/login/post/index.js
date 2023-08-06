import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const LoginAdminPost = createAsyncThunk('postLoginformFetch', async (payload) => {
    try {
        const response = await axios.post(`http://192.168.1.81:8000/api/v1/auth/login/`, {
            username: payload.username,
            password: payload.password,
        });

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});


const initialState = {
    status: null,
    message: '',
};

const loginAdminThunk = createSlice({
    name: 'loginAdminThunk',
    initialState,
    reducers: {
        resetData(state) {
            state.status = null;
            state.message = '';
        },
        foundToken(state) {
            if (localStorage.getItem('admin_Token')) {
                state.status = 'success';
                state.message = '';
            } else {
                state.status = null;
                state.message = '';
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginAdminPost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(LoginAdminPost.fulfilled, (state, { payload }) => {
                if (payload.success === true) {
                    state.status = 'success';
                    state.message = 'Siz muvofiyaqatli kirdingiz';
                    // localStorage.setItem('admin_AccessToken', payload.data.accessToken);
                    // localStorage.setItem('admin_RefreshToken', payload.data.refreshToken);
                } else if (payload.success === false) {
                    state.status = 'notFound';
                    state.message = 'Not Found';
                }
            })
            .addCase(LoginAdminPost.rejected, (state) => {
                state.status = 'Error';
            });
    },
});

export const { resetData, foundToken } = loginAdminThunk.actions;

export default loginAdminThunk.reducer;
