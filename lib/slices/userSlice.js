'use client'

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
});

export const { changeCurrentUser } = userSlice.actions;

export default userSlice.reducer;
