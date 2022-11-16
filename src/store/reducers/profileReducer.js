import { createSlice } from "@reduxjs/toolkit";

const profileReducer = createSlice({
    name: 'profileReducer',
    initialState: {
        name: '',
        email: '',
        photo: '',
        role: '',
    },
    reducers: {
        fetchProfileData: (state, action) => {
            if(action.payload.name) {
                state.name = action.payload.name
            } 
            if(action.payload.email) {
                state.email = action.payload.email
            }
            if(action.payload.photo) {
                state.photo = action.payload.photo
            }
            if(action.payload.role) {
                state.role = action.payload.role
            }
        }            
    }
});

export const { fetchProfileData } = profileReducer.actions
export default profileReducer.reducer;