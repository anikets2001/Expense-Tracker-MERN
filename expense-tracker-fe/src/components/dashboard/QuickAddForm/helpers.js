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
 * Handle form submission using RTK Query mutation
 * @param {Event} e - Form submit event
 * @param {Object} formData - Current form data
 * @param {Function} setFormData - State setter for form data
 * @param {Function} setError - State setter for error message
 * @param {Function} onSuccess - Callback on successful submission
 * @param {Function} createExpenseMutation - RTK Query mutation function
 */
export const handleSubmit = async (e, formData, setFormData, setError, onSuccess, createExpenseMutation) => {
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

    const response = await createExpenseMutation(expenseData).unwrap()

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
    setError(error?.data?.message || error?.message || 'Failed to create expense. Please try again.')
  }
}

// Re-export formatDateForDisplay for convenience
export { formatDateForDisplay }

