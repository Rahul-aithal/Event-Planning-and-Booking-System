// themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  dark:false // Default theme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = (state.theme === 'light' ? 'dark' : 'light');
      state.dark = !state.dark
      sessionStorage.setItem("Theme",state.theme);
    },
    sessionStorageThemeChanger:(state)=>{
      state.theme=  sessionStorage.getItem("Theme");
      state.dark =(state.theme === 'light' ? false : true);
    }
  },
});

export const { toggleTheme,sessionStorageThemeChanger } = themeSlice.actions;
export default themeSlice.reducer;
