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

// Re-export formatDateForDisplay for convenience
export { formatDateForDisplay }

