/**
 * Global helper functions used across multiple components
 */

/**
 * Format a date string (YYYY-MM-DD) to display format (MM/DD/YYYY)
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @param {string} placeholder - Placeholder text if date is empty (default: '')
 * @returns {string} Formatted date string or placeholder
 */
export const formatDateForDisplay = (dateString, placeholder = '') => {
  if (!dateString) return placeholder
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

/**
 * Format a Date object to input format (YYYY-MM-DD)
 * @param {Date} date - Date object
 * @returns {string} Formatted date string in YYYY-MM-DD format
 */
export const formatDateForInput = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}