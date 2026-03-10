import { API_BASE_URL } from '../utils/config'

/**
 * Get all expenses
 * @param {Object} params - Query parameters (page, limit, category, startDate, endDate, sortBy)
 * @returns {Promise<Object>} Expenses data with pagination
 */
export const getExpenses = async (params = {}) => {
  try {
    // Build query string
    const queryParams = new URLSearchParams()
    
    if (params.page) queryParams.append('page', params.page)
    if (params.limit) queryParams.append('limit', params.limit)
    if (params.category) queryParams.append('category', params.category)
    if (params.startDate) queryParams.append('startDate', params.startDate)
    if (params.endDate) queryParams.append('endDate', params.endDate)
    if (params.sortBy) queryParams.append('sortBy', params.sortBy)

    const queryString = queryParams.toString()
    const url = `${API_BASE_URL}/expenses${queryString ? `?${queryString}` : ''}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch expenses')
    }

    return data
  } catch (error) {
    throw new Error(error.message || 'Network error. Please try again.')
  }
}

/**
 * Create a new expense
 * @param {Object} expenseData - Expense data (amount, date, category, description)
 * @returns {Promise<Object>} Created expense
 */
export const createExpense = async (expenseData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create expense')
    }

    return data
  } catch (error) {
    throw new Error(error.message || 'Network error. Please try again.')
  }
}

/**
 * Update an existing expense
 * @param {string} expenseId - Expense ID
 * @param {Object} expenseData - Updated expense data (amount, date, category, description)
 * @returns {Promise<Object>} Updated expense
 */
export const updateExpense = async (expenseId, expenseData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses/${expenseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update expense')
    }

    return data
  } catch (error) {
    throw new Error(error.message || 'Network error. Please try again.')
  }
}

/**
 * Delete an expense
 * @param {string} expenseId - Expense ID
 * @returns {Promise<Object>} Deletion response
 */
export const deleteExpense = async (expenseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses/${expenseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete expense')
    }

    return data
  } catch (error) {
    throw new Error(error.message || 'Network error. Please try again.')
  }
}
