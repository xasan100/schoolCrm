import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../../api/Api.jsx';

export const AdminAddPost = createAsyncThunk('AdminAddPost', async (payload) => {
    try {
        const response = await instance.post(`base/users/`, {
            type: "admin",
            user: {
                username: payload.username,
                password: payload.password,
            },
            model: {
                admin_type: payload.adminId,
                first_name: payload.FirstName,
                last_name: payload.LastName,
                permission: [payload.permissionId],
            },
            menu: [
                {
                    id: 0,
                    element: "LoginAdminAdd",
                    title: " sahifa",
                    path: "/",
                    icon: "LuLayoutDashboard",
                },
                {
                    id: 1,
                    path: "/analiytics",
                    title: "",
                    element: "Analiytics",
                    icon: "LuLineChart",
                },
                {
                    id: 2,
                    title: "O'",
                    path: "/teachers",
                    element: "Teachers",
                    icon: "LiaChalkboardTeacherSolid",
                },
                {
                    id: 3,
                    title: "",
                    path: "/students",
                    element: "Students",
                    icon: "PiStudent",
                },
                {
                    "id": 4,
                    title: "",
                    path: "/staffs",
                    element: "Staffs",
                    icon: "PiUsersThree",
                },
                {
                    id: 5,
                    title: "",
                    path: "/users",
                    element: "Users",
                    icon: "LiaUsersCogSolid",
                },
                {
                    id: 6,
                    title: "",
                    path: "/income",
                    element: "income",
                    icon: "MdOutlineAttachMoney",
                },
                {
                    id: 7,
                    title: "",
                    path: "/expense",
                    element: "Expense",
                    icon: "MdOutlineMoneyOffCsred"
                },
            ]

        })

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});


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
