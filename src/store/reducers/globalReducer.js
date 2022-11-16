import { createSlice } from "@reduxjs/toolkit";

const globalReducer = createSlice({
    name: "globalReducer",
    initialState: {
        alertLoading: false,
        alertSuccess: false,
        alertFailure: false,
        filters: {
            monthFilter: '',
            statusFilter: '',
            counselorFilter: ''
        }
    },
    reducers: {
        sendSuccessAlert: (state, action) => {
            state.alertSuccess = true;
            state.alertFailure = false;
            state.alertLoading = false;
        },
        sendFailureAlert: (state, action) => {
            state.alertSuccess = false;
            state.alertFailure = true;
            state.alertLoading = false;
        },
        sendLoadingAlert: (state, action) => {
            state.alertLoading = true;
            state.alertSuccess = false;
            state.alertFailure = false;
        },
        changeFilters: (state, action) => {
            if(action.payload.month) {
                state.filters.monthFilter = action.payload.month;
            }
            if(action.payload.status) {
                state.filters.statusFilter = action.payload.status;
            }
            if(action.payload.counselor) {
                state.filters.counselorFilter = action.payload.counselor;
            }
        },

        resetMonthFilter: (state, action) => {
            state.filters.monthFilter = '';
        },

        resetCounselorFilter: (state, action) => {
            state.filters.counselorFilter = '';
        },

        resetStatusFilter: (state, action) => {
            state.filters.statusFilter = '';
        },

        resetFilters: (state, action) => {
            state.filters.monthFilter = '';
            state.filters.statusFilter = '';
            state.filters.counselorFilter = '';
        }
    }
});

export const { sendFailureAlert, sendSuccessAlert, sendLoadingAlert, changeFilters, resetFilters, resetMonthFilter, resetCounselorFilter, resetStatusFilter } = globalReducer.actions;
export default globalReducer.reducer;