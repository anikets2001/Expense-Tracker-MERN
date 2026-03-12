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

/**
 * Build sortBy parameter for API query
 * @param {string} sortField - Field to sort by ('date' or 'amount')
 * @param {string} sortDirection - Sort direction ('asc' or 'desc')
 * @returns {string} SortBy string (e.g., '-date' for descending, 'date' for ascending)
 */
export const buildSortBy = (sortField, sortDirection) => {
  return sortDirection === 'desc' ? `-${sortField}` : sortField
}

/**
 * Get sort icon name based on field and sort state
 * @param {string} field - Field name to check ('date' or 'amount')
 * @param {string} currentSortField - Currently active sort field
 * @param {string} sortDirection - Current sort direction ('asc' or 'desc')
 * @returns {string} Material icon name
 */
export const getSortIcon = (field, currentSortField, sortDirection) => {
  if (currentSortField !== field) {
    return 'unfold_more'
  }
  return sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'
}

/**
 * Get CSS classes for sort icon based on field and sort state
 * @param {string} field - Field name to check ('date' or 'amount')
 * @param {string} currentSortField - Currently active sort field
 * @returns {string} CSS classes for the sort icon
 */
export const getSortIconClass = (field, currentSortField) => {
  const baseClass = 'material-symbols-outlined text-sm hidden sm:inline transition-all'
  if (currentSortField === field) {
    return `${baseClass} text-[#111813] dark:text-white`
  }
  return `${baseClass} text-[#61896f] opacity-50`
}

/**
 * Generate pagination page numbers to display
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @returns {Array<number|string>} Array of page numbers to display (may include '...' for ellipsis)
 */
export const generatePageNumbers = (currentPage, totalPages) => {
  const pages = []
  const maxVisible = 5 // Maximum number of page buttons to show
  
  if (totalPages <= maxVisible) {
    // Show all pages if total is less than max visible
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)
    
    if (currentPage <= 3) {
      // Near the beginning
      for (let i = 2; i <= 4; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(totalPages)
    } else if (currentPage >= totalPages - 2) {
      // Near the end
      pages.push('...')
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // In the middle
      pages.push('...')
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(totalPages)
    }
  }
  
  return pages
}

/**
 * Format pagination info text
 * @param {number} currentPage - Current page number
 * @param {number} itemsPerPage - Number of items per page
 * @param {number} totalItems - Total number of items
 * @returns {string} Formatted text (e.g., "Showing 1 to 10 of 245 results")
 */
export const formatPaginationInfo = (currentPage, itemsPerPage, totalItems) => {
  const start = (currentPage - 1) * itemsPerPage + 1
  const end = Math.min(currentPage * itemsPerPage, totalItems)
  return `Showing ${start.toLocaleString()} to ${end.toLocaleString()} of ${totalItems.toLocaleString()} results`
}