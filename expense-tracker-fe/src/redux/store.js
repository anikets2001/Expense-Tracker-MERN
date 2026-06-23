import { configureStore } from '@reduxjs/toolkit'
import { expensesApi } from './services/expensesApis'
import { authApi } from './services/authApi'

export const store = configureStore({
  reducer: {
    [expensesApi.reducerPath]: expensesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(expensesApi.middleware, authApi.middleware),
})