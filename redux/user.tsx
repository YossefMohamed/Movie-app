import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  user: {
    favoriteMovies: [],
    following: [],
  },
};

export const userSlice = createSlice({
  name: "media",
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
      localStorage.setItem(
        "user",
        JSON.stringify({
          favoriteMovies: [],
          following: [],
        })
      );

      state.user = {
        favoriteMovies: [],
        following: [],
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
