import { instance } from "../../../../api/Api.jsx";

export const permissionPostAdmin = createAsyncThunk('permissionPostAdmin', async (payload) => {
    try {
        const response = await instance.post(`base/users/`, {
            type: "admin",
            user: {
                username: payload.username,
                password: payload.password,
            },
        })

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const permissionPost = createSlice({
    name: 'permissionPost',
    initialState: {
        data: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(permissionPostAdmin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(permissionPostAdmin.fulfilled, (state, { payload }) => {
                state.status = 'success';
                if (payload) {
                    state.data = payload;
                }
            })
            .addCase(permissionPostAdmin.rejected, (state) => {
                state.status = 'error';
            });
    },
});

export default permissionPost.reducer