import { createSlice } from '@reduxjs/toolkit';

const leadSlice = createSlice({
    name: "leadInfo",
    initialState: {
        leadsThisMonth: 0,
        pendingLeads: 0,
        newLeadsToday: 0,
    },

    reducers: {
        fetchLeadsData: (state, action) => {
            if(action.payload.leadsCount) {
                state.leadsThisMonth = action.payload.leadsCount;
            }

            if(action.payload.pendingLeads) {
                state.pendingLeads = action.payload.pendingLeads;
            }

            if(action.payload.newLeads) {
                state.newLeadsToday = action.payload.newLeads;
            }
        }
    }
});

export const { fetchLeadsData } = leadSlice.actions;
export default leadSlice.reducer;