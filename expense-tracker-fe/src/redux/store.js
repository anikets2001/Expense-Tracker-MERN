import { configureStore } from '@reduxjs/toolkit'
import { expensesApi } from './services/expensesApis'

export const store = configureStore({
  reducer: {
    [expensesApi.reducerPath]: expensesApi.reducer,
  },

   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(expensesApi.middleware),
})