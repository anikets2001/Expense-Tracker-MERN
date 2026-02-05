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
 * Handle form submission
 * @param {Event} e - Form submit event
 * @param {Object} formData - Current form data
 * @param {Function} setFormData - State setter for form data
 * @param {Function} onClose - Callback to close sidebar
 */
export const handleSubmit = (e, formData, setFormData, onClose) => {
  e.preventDefault()
  // Handle form submission here
  console.log('Form submitted:', formData)
  // Reset form
  setFormData({
    amount: '',
    date: '',
    category: '',
    description: ''
  })
  onClose()
}

// Re-export formatDateForDisplay for convenience
export { formatDateForDisplay }

