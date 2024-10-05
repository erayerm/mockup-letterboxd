import { createSlice } from '@reduxjs/toolkit';

const filmSlice = createSlice({
    name: 'film',
    initialState: {},
    reducers: {
        setFilmData: (state, action) => {
            const { slugifiedTitle, data } = action.payload;
            state[slugifiedTitle] = { ...data };
        },
        updateFilmData: (state, action) => {
            const { slugifiedTitle, updates } = action.payload;
            if (state[slugifiedTitle]) {
                state[slugifiedTitle] = { ...state[slugifiedTitle], ...updates };
            }
        },
    },
});

export const { setFilmData, updateFilmData } = filmSlice.actions;
export default filmSlice.reducer;
