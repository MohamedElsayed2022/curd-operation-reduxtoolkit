import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./Slices/postsSlice";

export const store = configureStore({
    reducer:{
        posts : postsSlice
    }
})