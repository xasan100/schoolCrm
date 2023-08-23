/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../../api/Api.jsx";

export const StudentsPost = createAsyncThunk(
    "AdminAddPost",
    async (payload) => {
        try {
            const response = await instance.post(`student/`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            if (instance.isCancel(error)) {
                console.log(error.message);
            }
            throw error.response.data;
        }
    }
);


