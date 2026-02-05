/**
 * Calendar component helper functions
 */

import { formatDateForInput, formatDateForDisplay } from '../../../utils/helpers'

/**
 * Handle date click in calendar
 * @param {number} day - Selected day
 * @param {Date} currentMonth - Current month date object
 * @param {Function} onChange - Callback function to handle date change
 * @param {Function} onClose - Callback function to close calendar
 */
export const handleDateClick = (day, currentMonth, onChange, onClose) => {
  const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
  const formattedDate = formatDateForInput(newDate)
  onChange(formattedDate)
  onClose()
}

/**
 * Navigate to previous month
 * @param {Date} currentMonth - Current month date object
 * @param {Function} setUserNavigatedMonth - State setter for navigated month
 */
export const goToPreviousMonth = (currentMonth, setUserNavigatedMonth) => {
  setUserNavigatedMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
}

/**
 * Navigate to next month (only if not in future)
 * @param {Date} currentMonth - Current month date object
 * @param {Function} setUserNavigatedMonth - State setter for navigated month
 */
export const goToNextMonth = (currentMonth, setUserNavigatedMonth) => {
  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
  const today = new Date()
  const todayMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  
  // Only allow navigation if next month is not in the future
  if (nextMonth <= todayMonth) {
    setUserNavigatedMonth(nextMonth)
  }
}

/**
 * Navigate to today's date
 * @param {Function} onChange - Callback function to handle date change
 * @param {Function} onClose - Callback function to close calendar
 * @param {Function} setUserNavigatedMonth - State setter for navigated month
 */
export const goToToday = (onChange, onClose, setUserNavigatedMonth) => {
  const today = new Date()
  setUserNavigatedMonth(null) // Reset to use value/today
  const formattedDate = formatDateForInput(today)
  onChange(formattedDate)
  onClose()
}

/**
 * Check if a day is today
 * @param {number} day - Day to check
 * @param {Date} currentMonth - Current month date object
 * @returns {boolean} True if the day is today
 */
export const isToday = (day, currentMonth) => {
  const today = new Date()
  return (
    day === today.getDate() &&
    currentMonth.getMonth() === today.getMonth() &&
    currentMonth.getFullYear() === today.getFullYear()
  )
}

/**
 * Check if a day is selected
 * @param {number} day - Day to check
 * @param {string} value - Selected date value
 * @param {Date} currentMonth - Current month date object
 * @returns {boolean} True if the day is selected
 */
export const isSelected = (day, value, currentMonth) => {
  if (!value) return false
  const selected = new Date(value)
  return (
    day === selected.getDate() &&
    currentMonth.getMonth() === selected.getMonth() &&
    currentMonth.getFullYear() === selected.getFullYear()
  )
}

/**
 * Check if a day is in the future
 * @param {number} day - Day to check
 * @param {Date} currentMonth - Current month date object
 * @returns {boolean} True if the day is in the future
 */
export const isFutureDate = (day, currentMonth) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Reset time to compare dates only
  
  const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
  checkDate.setHours(0, 0, 0, 0)
  
  return checkDate > today
}

/**
 * Check if current month is in the future
 * @param {Date} currentMonth - Current month date object
 * @returns {boolean} True if current month is in the future
 */
export const isCurrentMonthFuture = (currentMonth) => {
  const today = new Date()
  const currentMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const todayMonthDate = new Date(today.getFullYear(), today.getMonth(), 1)
  
  return currentMonthDate > todayMonthDate
}

// Re-export formatDateForDisplay for convenience
export { formatDateForDisplay }

