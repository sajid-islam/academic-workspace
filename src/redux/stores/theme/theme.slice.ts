import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface ThemeState {
  mode: "light" | "dark" | "system";
}

const initialState: ThemeState = {
  mode: "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeTheme } = themeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.theme.mode;

export default themeSlice.reducer;
