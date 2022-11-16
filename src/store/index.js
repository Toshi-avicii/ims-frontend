import { configureStore } from "@reduxjs/toolkit";
import authService from './services/authService';
import authReducer from './reducers/authReducer';
import leadService from './services/leadService';
import leadReducer from './reducers/leadReducer';
import counselorReducer from './reducers/counselorReducer';
import counselorService from './services/counselorService';
import globalReducer from "./reducers/globalReducer";
import profileService from "./services/profileService";
import profileReducer from "./reducers/profileReducer";
import trashService from "./services/trashService";
import trashCounselorService from "./services/trashCounselorService";

const store = configureStore({
    reducer: {
        [authService.reducerPath]: authService.reducer,
        [leadService.reducerPath]: leadService.reducer,
        [counselorService.reducerPath]: counselorService.reducer,
        [profileService.reducerPath]: profileService.reducer,
        [trashService.reducerPath]: trashService.reducer,
        [trashCounselorService.reducerPath]: trashCounselorService.reducer,
        "authReducer": authReducer,
        "leadReducer": leadReducer,
        "counselorReducer": counselorReducer,
        "appGlobalReducer": globalReducer,
        "profileReducer": profileReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([leadService.middleware, counselorService.middleware, trashService.middleware, profileService.middleware, trashCounselorService.middleware])
    }
});

export default store;