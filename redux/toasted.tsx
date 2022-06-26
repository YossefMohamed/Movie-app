import {  createSlice } from "@reduxjs/toolkit";

interface InitalState {
    message : string
    type : string
}

const initialState: InitalState = {message : "",
type : ""};

export const toastedSlice = createSlice({
  name: "media",
  initialState: initialState,
  reducers: {
   addToast :(state , action) => {
         state.message = action.payload.message;
         state.type = action.payload.type;
    }

    }
  },
);

export const { addToast } = toastedSlice.actions;