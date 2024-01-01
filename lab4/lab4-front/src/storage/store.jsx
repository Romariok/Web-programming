import { configureStore } from "@reduxjs/toolkit";
import { LoginSlice } from "./slices/LoginSlice.jsx";
import { SignupSlice } from "./slices/SignUpSlice.jsx";
import {AppSlice} from "./slices/AppSlice.jsx";
import {PointerSlice} from "./slices/PointerSlice.jsx";

const store = configureStore({
    reducer: {
        login: LoginSlice.reducer,
        signup: SignupSlice.reducer,
        app: AppSlice.reducer,
        pointer: PointerSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        })
});

export default store;