import { configureStore } from '@reduxjs/toolkit'
//import counterSlice from './features/counter/counterSlice'
import userSlice from './features/user/userSlice'

/*
Creating a Redux Store per Request

The first change is to move from defining store as a global to defining a makeStore function that returns a new store
for each request:
-Store'ları global olarak tanımlamak yerine store'u oluşturacak makeStore fonksiyonu
*/

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userSlice
        },
    })
}

/*
Now we have a function, makeStore, that we can use to create a store instance per-request while retaining the strong
type safety (if you choose to use TypeScript) that Redux Toolkit provides.
-Artık elimizde her istekte store oluşturabileceğimiz bir makeStore fonksiyonu var.

We don't have a store variable exported, but we can infer the RootState and AppDispatch types from the return type of
makeStore.
-bu typescript ile alakalı
*/