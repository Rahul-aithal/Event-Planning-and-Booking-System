import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,

}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            localStorage.setItem("authState",JSON.stringify(state));
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
             localStorage.removeItem("authState");
        },
        initializeStateFromStorage :(state)=>{
            const storedState = localStorage.getItem("authState");
            if(storedState){
                const parsedSate= JSON.parse(storedState);
                state.status=parsedSate.status;
                state.userData=parsedSate.userData;
            }
        }
    }
})

export const { login, logout,initializeStateFromStorage } = authSlice.actions
export default authSlice.reducer