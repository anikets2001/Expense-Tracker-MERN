import { configureStore } from '@reduxjs/toolkit'
import { expensesApi } from './services/expensesApis'
import { authApi } from './services/authApi'
import authReducer, { logout } from './slices/authSlice'

// Clears cached query results from both API slices whenever logout fires,
// so a new login on the same tab never flashes the previous user's data.
const resetApiCacheOnLogout = (storeAPI) => (next) => (action) => {
  const result = next(action)
  if (action.type === logout.type) {
    storeAPI.dispatch(expensesApi.util.resetApiState())
    storeAPI.dispatch(authApi.util.resetApiState())
  }
  return result
}

export const store = configureStore({
  reducer: {
    [expensesApi.reducerPath]: expensesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },

   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(expensesApi.middleware, authApi.middleware, resetApiCacheOnLogout),
})