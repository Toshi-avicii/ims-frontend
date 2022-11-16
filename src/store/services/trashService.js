import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const trashService = createApi({
    reducerPath: "trash",
    tagTypes: ['trash'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_ROUTE,
        prepareHeaders: function(headers, { getState }) {
             const reducers = getState();
            const token = reducers?.authReducer?.adminToken;
            // authorization bearer token
            headers.set('authorization', token ? `Bearer: ${token}` : '');
            return headers;
        }
    }),
    endpoints: (builder) => {
        return {
            getLeadsTrashByPage: builder.query({
                query: (pageNo) => {
                    return {
                        url: `/leads/trash/pages/${pageNo}`,
                        method: 'GET'
                    }
                },
                providesTags: ['trash'],
            }),

            recoverFromTrash: builder.mutation({
                query: (leadId) => {
                    return {
                        url: `/leads/trash/recover/${leadId}`,
                        method: "POST"
                    }
                },
                invalidatesTags: ['trash'],
            }),

            deletePermanently: builder.mutation({
                query: (leadId) => {
                    return {
                        url: `/leads/trash/${leadId}`,
                        method: 'DELETE'
                    }
                },
                invalidatesTags: ['trash'],
            })
        }
    }
});

export const { 
    useGetLeadsTrashByPageQuery,
    useDeletePermanentlyMutation,
    useRecoverFromTrashMutation
} = trashService;
export default trashService;