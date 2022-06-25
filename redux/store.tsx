import { configureStore } from "@reduxjs/toolkit";
import { toastedSlice } from "./toasted";
import { userSlice } from "./user";

export const store = configureStore({
  reducer: {
    toast : toastedSlice.reducer,
    user : userSlice.reducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;