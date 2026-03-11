import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from '../../utils/config'

export const expensesApi = createApi({
  reducerPath: 'expensesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    }
  }),
  refetchOnMountOrArgChange: true,
  tagTypes: ['Expense'],
  endpoints: (build) => ({
    // Get all expenses with optional query parameters
    getExpenses: build.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams()
        if (params.page) queryParams.append('page', params.page)
        if (params.limit) queryParams.append('limit', params.limit)
        if (params.category) queryParams.append('category', params.category)
        if (params.startDate) queryParams.append('startDate', params.startDate)
        if (params.endDate) queryParams.append('endDate', params.endDate)
        if (params.sortBy) queryParams.append('sortBy', params.sortBy)
        
        const queryString = queryParams.toString()
        return `/expenses${queryString ? `?${queryString}` : ''}`
      },
      providesTags: ['Expense'],
    }),
    
    // Get single expense by ID
    getExpense: build.query({
      query: (id) => `/expenses/${id}`,
      providesTags: (result, error, id) => [{ type: 'Expense', id }],
    }),
    
    // Get expense statistics
    getExpenseStats: build.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams()
        if (params.startDate) queryParams.append('startDate', params.startDate)
        if (params.endDate) queryParams.append('endDate', params.endDate)
        
        const queryString = queryParams.toString()
        return `/expenses/stats${queryString ? `?${queryString}` : ''}`
      },
      providesTags: ['Expense'],
    }),
    
    // Create new expense
    createExpense: build.mutation({
      query: (expenseData) => ({
        url: '/expenses',
        method: 'POST',
        body: expenseData,
      }),
      invalidatesTags: ['Expense'],
    }),
    
    // Update expense
    updateExpense: build.mutation({
      query: ({ id, ...expenseData }) => ({
        url: `/expenses/${id}`,
        method: 'PUT',
        body: expenseData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Expense', id }, 'Expense'],
    }),
    
    // Delete expense
    deleteExpense: build.mutation({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expense'],
    }),
  }),
})

export const {
  useGetExpensesQuery,
  useGetExpenseQuery,
  useGetExpenseStatsQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApi