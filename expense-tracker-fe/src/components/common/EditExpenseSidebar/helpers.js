/**
 * EditExpenseSidebar component helper functions
 */

import { categories } from '../AddExpenseSidebar/helpers'

/**
 * Handle input field changes
 * @param {string} field - Field name to update
 * @param {*} value - New value for the field
 * @param {Function} setFormData - State setter for form data
 */
export const handleInputChange = (field, value, setFormData) => {
  setFormData(prev => ({ ...prev, [field]: value }))
}

/**
 * Format date for input field (YYYY-MM-DD)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDateForInput = (date) => {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Handle form submission for editing expense
 * @param {Event} e - Form submit event
 * @param {string} expenseId - Expense ID to update
 * @param {Object} formData - Current form data
 * @param {Function} setFormData - State setter for form data
 * @param {Function} onClose - Callback to close sidebar
 * @param {Function} setIsLoading - State setter for loading state
 * @param {Function} setError - State setter for error message
 * @param {Function} onSuccess - Callback on successful submission
 */
export const handleSubmit = async (e, expenseId, formData, setFormData, onClose, setIsLoading, setError, onSuccess) => {
  e.preventDefault()
  
  // Validate required fields
  if (!formData.amount || !formData.date || !formData.category) {
    setError('Please fill in all required fields')
    return
  }

  setIsLoading(true)
  setError(null)

  try {
    const { updateExpense } = await import('../../../services/expenseService')
    
    // Prepare data for API
    const expenseData = {
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category,
      description: formData.description || ''
    }

    const response = await updateExpense(expenseId, expenseData)

    if (response.success) {
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(response.data.expense)
      }
      
      onClose()
    }
  } catch (error) {
    setError(error.message || 'Failed to update expense. Please try again.')
  } finally {
    setIsLoading(false)
  }
}

// Re-export categories
export { categories }
