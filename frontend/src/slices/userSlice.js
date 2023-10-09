import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null,
    loading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
        },
        signInFailure: (state) => {
            state.loading = false
        },
        updateUserStart: (state) => {
            state.loading = true
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser))
        },
        updateUserFailure: (state) => {
            state.loading = false
        },
        deleteStart: (state) => {
            state.loading = true
        },
        deleteSuccess: (state) => {
            localStorage.setItem("currentUser", JSON.stringify(null));
            state.currentUser = null
            state.loading = false
        },
        deleteFailure: (state) => {
            state.loading = false
        },
        signOutStart: (state) => {
            state.loading = true
        },
        signOutSuccess: (state) => {
            localStorage.setItem("currentUser", JSON.stringify(null));
            state.currentUser = null
            state.loading = false
        },
        signOutFailure: (state) => {
            state.loading = false
        }
    }
});

export const {signOutStart, signOutFailure, signOutSuccess , deleteFailure, deleteStart, deleteSuccess, updateUserFailure, updateUserStart, updateUserSuccess ,signInStart, signInFailure, signInSuccess} = userSlice.actions

export default userSlice.reducer