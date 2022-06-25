import {  createSlice } from "@reduxjs/toolkit";

interface InitalState {
   id : string
}

const initialState: any = {
    user : {},
};

export const userSlice = createSlice({
  name: "media",
  initialState: initialState,
  reducers: {
   login :(state , action) => {
        state.user = action.payload;
    },
    logout :(state , action) => {
        state.user = {};
    }

    }
  },
);

export const { login } = userSlice.actions;