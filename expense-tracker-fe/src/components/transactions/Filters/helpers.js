/**
 * Filters component helper functions
 */

/**
 * Format date for filter display (e.g., "Jan 2024")
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} Formatted date string (e.g., "Jan 2024")
 */
export const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()
  return `${month} ${year}`
}

/**
 * Toggle category selection
 * @param {string} category - Category to toggle
 * @param {Function} setSelectedCategories - State setter for selected categories
 */
export const toggleCategory = (category, setSelectedCategories) => {
  setSelectedCategories(prev =>
    prev.includes(category)
      ? prev.filter(c => c !== category)
      : [...prev, category]
  )
}

/**
 * Clear a specific filter
 * @param {string} type - Filter type ('date', 'categories', 'amount')
 * @param {Function} setStartDate - State setter for start date
 * @param {Function} setEndDate - State setter for end date
 * @param {Function} setSelectedCategories - State setter for selected categories
 * @param {Function} setMinAmount - State setter for min amount
 * @param {Function} setMaxAmount - State setter for max amount
 */
export const clearFilter = (
  type,
  setStartDate,
  setEndDate,
  setSelectedCategories,
  setMinAmount,
  setMaxAmount
) => {
  if (type === 'date') {
    setStartDate('')
    setEndDate('')
  } else if (type === 'categories') {
    setSelectedCategories([])
  } else if (type === 'amount') {
    setMinAmount('')
    setMaxAmount('')
  }
}

/**
 * Clear all filters
 * @param {Function} setStartDate - State setter for start date
 * @param {Function} setEndDate - State setter for end date
 * @param {Function} setSelectedCategories - State setter for selected categories
 * @param {Function} setMinAmount - State setter for min amount
 * @param {Function} setMaxAmount - State setter for max amount
 */
export const clearAllFilters = (
  setStartDate,
  setEndDate,
  setSelectedCategories,
  setMinAmount,
  setMaxAmount
) => {
  setStartDate('')
  setEndDate('')
  setSelectedCategories([])
  setMinAmount('')
  setMaxAmount('')
}

