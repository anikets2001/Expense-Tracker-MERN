/**
 * DateRangePicker component helper functions
 */

import { formatDateForInput, formatDateForDisplay } from '../../../utils/helpers'

/**
 * Quick filter options for date range
 */
export const quickFilters = [
  { label: 'Today', days: 0 },
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'This month', days: 'thisMonth' },
  { label: 'Last month', days: 'lastMonth' }
]

/**
 * Handle quick filter selection
 * @param {Object} filter - Filter object with days property
 * @param {Function} onStartDateChange - Callback to update start date
 * @param {Function} onEndDateChange - Callback to update end date
 */
export const handleQuickFilter = (filter, onStartDateChange, onEndDateChange) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (filter.days === 0) {
    // Today
    const dateStr = formatDateForInput(today)
    onStartDateChange(dateStr)
    onEndDateChange(dateStr)
  } else if (filter.days === 'thisMonth') {
    // This month
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
    onStartDateChange(formatDateForInput(firstDay))
    onEndDateChange(formatDateForInput(today))
  } else if (filter.days === 'lastMonth') {
    // Last month
    const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
    const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    onStartDateChange(formatDateForInput(firstDayLastMonth))
    onEndDateChange(formatDateForInput(lastDayLastMonth))
  } else {
    // Last N days
    const startDate = new Date(today)
    startDate.setDate(today.getDate() - filter.days)
    onStartDateChange(formatDateForInput(startDate))
    onEndDateChange(formatDateForInput(today))
  }
}

// Re-export formatDateForDisplay for convenience
export { formatDateForDisplay }

