// slice=> it will  fetch data from the backend and store it in the redux store.

import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "./authThunk";

const savedUser = localStorage.getItem("user");
let initialUser = null;
try {
    initialUser = savedUser ? JSON.parse(savedUser) : null;
} catch (error) {
    console.error("Unable to restore the saved user session", error);
    localStorage.removeItem("user");
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: initialUser,
        isAuthenticated: Boolean(initialUser && localStorage.getItem("jwt")),
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem("jwt");
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
