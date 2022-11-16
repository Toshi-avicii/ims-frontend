import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const trashCounselorService = createApi({
  reducerPath: "trashedCounselorS",
  tagTypes: ["trash"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_ROUTE,
    prepareHeaders: function (headers, { getState }) {
      const reducers = getState();
      const token = reducers?.authReducer?.adminToken;

      headers.set("authorization", token ? `Bearer: ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      getTrashedCounselors: builder.query({
        query: (page) => {
          return {
            url: `counselors/trash/pages/${page}`,
            method: "GET",
          };
        },
        providesTags: ["trash"],
      }),
      deleteTrashedCounselors: builder.mutation({
        query: (counselorId) => {
          return {
            url: `counselors/trash/${counselorId}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["trash"],
      }),
      recoverTrashedCounselor: builder.mutation({
        query: (counselorId) => {
          return {
            url: `counselors/trash/recover/${counselorId}`,
            method: "POST",
          };
        },
        invalidatesTags: ["trash"],
      }),
    };
  },
});

export const {
  useGetTrashedCounselorsQuery,
  useDeleteTrashedCounselorsMutation,
  useRecoverTrashedCounselorMutation,
} = trashCounselorService;
export default trashCounselorService;
