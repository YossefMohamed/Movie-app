import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  user: {
    favoriteMovies: [],
    following: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      action.payload.token &&
        localStorage.setItem("token", action.payload.token);

      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      state.user = {
        favoriteMovies: [],
        following: [],
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
