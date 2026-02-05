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

