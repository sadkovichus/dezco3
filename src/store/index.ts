import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlices/userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import postSlice from "./slices/postsSlices/postSlice";
import balanceSlice from "./slices/balanceSlice/balanceSlice";

const store = configureStore({
    reducer: {
        userSlice: userSlice,
        postSlice: postSlice,
        balanceSlice: balanceSlice
    },
})
type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;