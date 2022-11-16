import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const leadService = createApi({
    reducerPath: "leads",
    tagTypes: ['leads'],
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
            updateOneLead: builder.mutation({
                query: (leadData) => {
                    return {
                        url: `leads/${leadData.leadId}`,
                        method: 'PATCH',
                        body: leadData
                    }
                },
                invalidatesTags: ['leads']
            }),

            getAllLeads: builder.query({
                query: () => {
                    return {
                        url: 'leads',
                        method: 'GET',
                    }
                },
                providesTags: ['leads']
            }),
            getLeadsByPage: builder.query({
                query: (filteredData) => {
                    return {
                        url: `leads/pages/${filteredData.page}`,
                        method: 'GET',
                        params: filteredData
                    }
                },
                providesTags: ['leads']
            }),

            deleteOneLead: builder.mutation({
                query: (leadId) => {
                    return {
                        url: `leads/${leadId}`,
                        method: "DELETE"
                    }
                },
                invalidatesTags: ['leads']
            }),

            addLeads: builder.mutation({
                query: (leadData) => {
                    return {
                        url: "leads",
                        method: "POST",
                        body: leadData
                    }
                },
                invalidatesTags: ['leads']
            }),

            sendToTrash: builder.mutation({
                query: (leadId) => {
                    return {
                        url: `/leads/trash/${leadId}`,
                        method: "POST"
                    }
                },
                invalidatesTags: ['leads']
            }),

            getFilteredLeads: builder.mutation({
                query: (filters) => {
                    return {
                        url: `/leads/filters/pages/${filters.page}`,
                        method: "POST",
                        body: filters
                    }
                },
                invalidatesTags: ['leads']
            }),
            
            getLeadsByOneCounselor: builder.query({
                query: (counselorId) => {
                    return {
                        url: `/leads/counselors/${counselorId}`,
                        method: "GET"
                    }
                },
                providesTags: ['leads']
            })
        }
    }
});

export const { 
    useGetAllLeadsQuery, 
    useGetLeadsByPageQuery,
    useUpdateOneLeadMutation, 
    useDeleteOneLeadMutation, 
    useAddLeadsMutation,
    useSendToTrashMutation,
    useGetFilteredLeadsMutation,
    useGetLeadsByOneCounselorQuery
} = leadService;
export default leadService;