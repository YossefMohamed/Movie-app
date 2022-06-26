import {  createSlice } from "@reduxjs/toolkit";



const initialState: any = {
    user : {
      favoriteMovies : []
    },
};

export const userSlice = createSlice({
  name: "media",
  initialState: initialState,
  reducers: {
   login :(state , action) => {
     localStorage.setItem("user" , JSON.stringify(action.payload))
        state.user = action.payload;
    },
    logout :(state) => {
        state.user = {};
    }

    }
  },
);

export const { login } = userSlice.actions;