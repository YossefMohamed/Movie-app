import {  createSlice } from "@reduxjs/toolkit";

interface InitalState {
    image : string
    status : boolean
}

const initialState: InitalState = {image : "",
status :false
};

export const imageSlice = createSlice({
  name: "media",
  initialState: initialState,
  reducers: {
   addImage :(state , action) => {
         state.image = action.payload.image;
         state.status = action.payload.status;
    }

    }
  },
);

export const { addImage } = imageSlice.actions;