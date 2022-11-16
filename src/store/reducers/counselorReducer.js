import { createSlice } from '@reduxjs/toolkit';

const counselorReducer = createSlice({
    name: 'counselorInfo',
    initialState: {
        counselorCount: 0
    },
    reducers: {
        fetchCounselorData: (state, action) => {
            state.counselorCount = action.payload.counselorCount;
        }
    }
});

export const { fetchCounselorData } = counselorReducer.actions;
export default counselorReducer.reducer;