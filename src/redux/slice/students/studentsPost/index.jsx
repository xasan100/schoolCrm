import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../../api/Api.jsx";

export const StudentsPost = createAsyncThunk(
    "AdminAddPost",
    async (payload) => {
        try {
            const response = await api.post(`student/`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            if (api.isCancel(error)) {
                console.log(error.message);
            }
            throw error.response.data;
        }
    }
);


