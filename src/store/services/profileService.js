import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const profileService = createApi({
    reducerPath: 'profile',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://inquiry-management-system-backend.onrender.com/api/profile/',
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
            getUserProfile: builder.query({
                query: (decode) => {
                    return {
                        url: `${decode.id}`,
                        method: 'GET'
                    }
                },
                providesTags: ['userProfile']
            }),
            updateUserProfile: builder.mutation({
                query: (updateProfile) => {
                    return {
                        url: `edit-profile/${updateProfile.id}`,
                        method: 'PATCH',
                        body: {
                            id: updateProfile.id,
                            name: updateProfile.name,
                            email: updateProfile.email,
                            photo: updateProfile.photo
                        }
                    }
                },
                invalidatesTags: ['profile']
            }),
        }
    }
})

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = profileService;
export default profileService;
