import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",

    initialState: {
        currentUser: null,
        token: null,
        isFetching: false,
        error: false,
        features: [],
        isSuperAdmin: false,
    },

    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess: (state, action) => {
            const { user, token } = action.payload;
            state.isFetching = false;
            state.currentUser = user;
            state.token = token;
            state.error = false;
            // Store features in both places for backward compatibility
            state.features = user.features || [];
            state.isSuperAdmin = user.isSuperAdmin || false;
            
            // Store in localStorage as backup
            try {
                localStorage.setItem('features', JSON.stringify(user.features));
                localStorage.setItem('userFeatures', JSON.stringify(user.features));
            } catch (error) {
                console.error('Failed to store features in localStorage:', error);
            }
        },

        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload || true;
            state.currentUser = null;
            state.token = null;
        },

        signOut: (state) => {
            state.currentUser = null;
            state.token = null;
            state.isFetching = false;
            state.error = false;
            state.features = [];
            state.isSuperAdmin = false;
        },

        // Action to update token without full login
        setToken: (state, action) => {
            state.token = action.payload;
        },

        // Action to clear token
        clearToken: (state) => {
            state.token = null;
        },
    },
});

export const {
    loginFailure,
    loginStart,
    loginSuccess,
    signOut,
    setToken,
    clearToken
} = userSlice.actions;

export default userSlice.reducer;