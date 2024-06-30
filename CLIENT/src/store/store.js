import { configureStore } from '@reduxjs/toolkit'
import authSlice, { initializeStateFromStorage } from './authSlice.js'
import themSlice, { sessionStorageThemeChanger } from './themeChangerSlice.js'

 const store = configureStore({
    reducer: {
        auth:authSlice,
        themeChanger:themSlice,
    },
  })

store.dispatch(initializeStateFromStorage())
store.dispatch(sessionStorageThemeChanger())
  
export default store