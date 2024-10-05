import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import sessionReducer from './features/sessionSlice';
import filmReducer from './features/film/filmSlice'
import logger from 'redux-logger';

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userSlice,
            film: filmReducer,
            session: sessionReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    })
}
