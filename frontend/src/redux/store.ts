import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSchema } from '../api/ApiConfig'
import authenticationReducer from './authentication/Authentication.slice'

export const store = configureStore({
  reducer: {
    [apiSchema.reducerPath]: apiSchema.reducer,
    authentication: authenticationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSchema.middleware),
})

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;