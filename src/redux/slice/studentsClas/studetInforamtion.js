import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const StudentInformationApi = createApi({
    reducerPath: "StudentInformationData",
    baseQuery: api,
    tagTypes: ["StudentInformationData"],
    endpoints: (builder) => ({
        getStudentInformation: builder.query({
            query: (id) => `/classes/${id}/get_informations_of_class_pk/`,
            providesTags: ["StudentInformationData"],
        }),
        getStudentAttendance: builder.query({
            query: (id) => `/classes/${id}/get_attendances_of_class_pk/`,
            providesTags: ["StudentAttendance"],
        }),
    }),
});

export const {
    useGetStudentInformationQuery,
    useGetStudentAttendanceQuery,
} = StudentInformationApi;
