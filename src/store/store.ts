import { configureStore } from '@reduxjs/toolkit'
import globalsReducer from "@store/slices/globalsSlice"
import customersReducer from "@store/slices/customersSlice"
import countriesReducer from "@store/slices/countriesSlice"
import botsReducer from "@store/slices/botsSlice"

export const store = configureStore({
  reducer: {
    globals: globalsReducer,
    customers: customersReducer,
    countries: countriesReducer,
    bots: botsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch