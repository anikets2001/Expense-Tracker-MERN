/**
 * AddExpenseSidebar component helper functions
 */

import { formatDateForDisplay } from '../../../utils/helpers'

/**
 * Categories list for expense form
 */
export const categories = [
  'Food & Drinks',
  'Transport',
  'Housing',
  'Entertainment',
  'Shopping',
  'Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Other'
]

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
 * Handle form submission using RTK Query mutation
 * @param {Event} e - Form submit event
 * @param {Object} formData - Current form data
 * @param {Function} setFormData - State setter for form data
 * @param {Function} onClose - Callback to close sidebar
 * @param {Function} setError - State setter for error message
 * @param {Function} onSuccess - Callback on successful submission
 * @param {Function} createExpenseMutation - RTK Query mutation function
 */
export const handleSubmit = async (e, formData, setFormData, onClose, setError, onSuccess, createExpenseMutation) => {
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
      
      onClose()
    }
  } catch (error) {
    setError(error?.data?.message || error?.message || 'Failed to create expense. Please try again.')
  }
}

// Re-export formatDateForDisplay for convenience
export { formatDateForDisplay }

