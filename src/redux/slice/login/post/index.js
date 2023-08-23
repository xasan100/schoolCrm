import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../../api/Api.jsx';
export const LoginAdminPost = createAsyncThunk('postLoginformFetch', async (payload) => {
    try {
        const response = await instance.post(`token/login/`, {
            username: payload.username,
            password: payload.password,
        }).then((res) => {
            if (res.statusText === "OK") {
                localStorage.setItem('auth_token', res.data.auth_token)
            }
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
                if (payload.data.auth_token) {
                    state.status = 'success';
                    state.message = 'Siz muvofiyaqatli kirdingiz';
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
