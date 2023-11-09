import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/Api";

export const StudentInforamation = createApi({
    reducerPath: "StudentInformationData",
    baseQuery: api,
    tagTypes: ["StudentInformation"],
    endpoints: (build) => ({
        getStudentInformation: build.query({
            query: (id) => `/classes/${id}/get_informations_of_class_pk/`,
            providesTags: ["Teachers"],
        }),
        getStundentAttandace: build.query({
            query: () => "classes/{id}/get_attendances_of_class_pk/",
            providesTags: ["StudentInformation"],
        }),

    }),
});

export const {
    useGetStudentInformationQuery,
    useLazyGetStundentAttandaceQuery,
} = StudentInforamation;
