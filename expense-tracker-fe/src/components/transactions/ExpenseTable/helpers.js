/**
 * ExpenseTable component helper functions
 */

/**
 * Get CSS classes for category badge based on color
 * @param {string} color - Category color ('blue', 'purple', 'amber', 'primary', 'cyan')
 * @returns {string} CSS classes for the category badge
 */
export const getCategoryClass = (color) => {
  const classes = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    primary: 'bg-primary/20 text-[#111813] dark:text-primary',
    cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300'
  }
  return classes[color] || classes.blue
}

/**
 * Get category color based on category name
 * @param {string} category - Category name
 * @returns {string} Color name
 */
export const getCategoryColor = (category) => {
  const colorMap = {
    'Food & Drinks': 'blue',
    'Transport': 'amber',
    'Housing': 'primary',
    'Entertainment': 'purple',
    'Shopping': 'purple',
    'Utilities': 'cyan',
    'Healthcare': 'blue',
    'Education': 'purple',
    'Travel': 'amber',
    'Other': 'cyan'
  }
  return colorMap[category] || 'blue'
}

/**
 * Format date for display
 * @param {string|Date} date - Date string or Date object
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

/**
 * Format amount for display
 * @param {number} amount - Amount value
 * @returns {string} Formatted amount string with currency symbol
 */
export const formatAmount = (amount) => {
  return `₹${amount.toLocaleString('en-IN', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`
}
