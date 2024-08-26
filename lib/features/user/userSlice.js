import { createSlice } from '@reduxjs/toolkit'

const init = {
    user_id: 1,
    photo: "/img/profile-picture.jpg",
    username: "determinate",
    givenName: "Eray",
    familyName: "",
    location: "Istanbul",
}

export const userSlice = createSlice({
    name: 'loggedUser',
    initialState: init,
    reducers: {
        login: state => {
            state = init;
        },
        logout: state => {
            state = {};
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer