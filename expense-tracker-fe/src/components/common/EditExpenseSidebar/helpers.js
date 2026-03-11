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
 * Handle form submission for editing expense using RTK Query mutation
 * @param {Event} e - Form submit event
 * @param {string} expenseId - Expense ID to update
 * @param {Object} formData - Current form data
 * @param {Function} onClose - Callback to close sidebar
 * @param {Function} setError - State setter for error message
 * @param {Function} onSuccess - Callback on successful submission
 * @param {Function} updateExpenseMutation - RTK Query mutation function
 */
export const handleSubmit = async (e, expenseId, formData, onClose, setError, onSuccess, updateExpenseMutation) => {
  e.preventDefault()
  
  // Validate required fields
  if (!formData.amount || !formData.date || !formData.category) {
    setError('Please fill in all required fields')
    return
  }

  setError(null)

  try {
    // Prepare data for API
    const expenseData = {
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category,
      description: formData.description || ''
    }

    const response = await updateExpenseMutation({ id: expenseId, ...expenseData }).unwrap()

    if (response.success) {
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(response.data.expense)
      }
      
      onClose()
    }
  } catch (error) {
    setError(error?.data?.message || error?.message || 'Failed to update expense. Please try again.')
  }
}

// Re-export categories
export { categories }
