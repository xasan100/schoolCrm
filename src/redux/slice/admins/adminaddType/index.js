import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../../api/Api.jsx";

export const AdminAddPost = createAsyncThunk(
  "AdminAddPost",
  async (payload) => {
    try {
        const response = await instance.post(`base/users/`, {
            type:"admin",
            user: {
                username: payload.username,
                password: payload.password,
            },
            model: {
                admin_type: payload.selectChange,
                first_name: payload.FirstName,
                last_name: payload.LastName,
                permission:[12]
            }
            
        })

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// const initialState = {
//     status: null,
//     message: '',
// };

// const AdminAdd = createSlice({
//     name: 'loginAdminThunk',
//     initialState,
//     reducers: {
//         resetData(state) {
//             state.status = null;
//             state.message = '';
//         },
//         foundToken(state) {
//             if (localStorage.getItem('admin_Token')) {
//                 state.status = 'success';
//                 state.message = '';
//             } else {
//                 state.status = null;
//                 state.message = '';
//             }
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(AdminAddPost.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(AdminAddPost.fulfilled, (state, { payload }) => {
//                 if (1) {
//                     state.status = 'success';
//                     state.message = 'Siz muvofiyaqatli kirdingiz';
//                 } else if (payload.success === false) {
//                     state.status = 'notFound';
//                     state.message = 'Not Found';
//                 }
//             })
//             .addCase(AdminAddPost.rejected, (state) => {
//                 state.status = 'Error';
//             });
//     },
// });

// export const { resetData, foundToken } = AdminAdd.actions;

// export default AdminAdd.reducer;
