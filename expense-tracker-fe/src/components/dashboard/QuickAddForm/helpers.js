/**
 * QuickAddForm component helper functions
 */

import { formatDateForDisplay } from '../../../utils/helpers'

/**
 * Handle date change from calendar
 * @param {string} newDate - New date value
 * @param {Function} setDate - State setter for date
 */
export const handleDateChange = (newDate, setDate) => {
  setDate(newDate)
}

/**
 * Handle input click to open calendar
 * @param {Function} setIsCalendarOpen - State setter for calendar open state
 */
export const handleInputClick = (setIsCalendarOpen) => {
  setIsCalendarOpen(true)
}

/**
 * Handle form submission
 * @param {Event} e - Form submit event
 * @param {Object} formData - Current form data
 * @param {Function} setFormData - State setter for form data
 * @param {Function} setIsLoading - State setter for loading state
 * @param {Function} setError - State setter for error message
 * @param {Function} onSuccess - Callback on successful submission
 * @param {Function} createExpense - API function to create expense
 */
export const handleSubmit = async (e, formData, setFormData, setIsLoading, setError, onSuccess, createExpense) => {
  e.preventDefault()
  
  // Validate required fields
  if (!formData.amount || !formData.date || !formData.category) {
    setError('Please fill in all required fields')
    return
  }

  setIsLoading(true)
  setError(null)

  try {
    // Prepare data for API
    const expenseData = {
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category,
      description: formData.description || ''
    }

    const response = await createExpense(expenseData)

    if (response.success) {
      // Reset form
      setFormData({
        amount: '',
        date: '',
        category: '',
        description: ''
      })
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(response.data.expense)
      }
    }
  } catch (error) {
    setError(error.message || 'Failed to create expense. Please try again.')
  } finally {
    setIsLoading(false)
  }
}

// Re-export formatDateForDisplay for convenience
export { formatDateForDisplay }

