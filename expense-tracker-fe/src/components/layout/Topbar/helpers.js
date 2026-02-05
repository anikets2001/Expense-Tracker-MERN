/**
 * Topbar component helper functions
 */

/**
 * Toggle dropdown open/closed state
 * @param {boolean} isDropdownOpen - Current dropdown state
 * @param {Function} setIsDropdownOpen - State setter for dropdown
 */
export const toggleDropdown = (isDropdownOpen, setIsDropdownOpen) => {
  setIsDropdownOpen(!isDropdownOpen)
}

/**
 * Toggle notifications open/closed state
 * @param {boolean} isNotificationsOpen - Current notifications state
 * @param {Function} setIsNotificationsOpen - State setter for notifications
 */
export const toggleNotifications = (isNotificationsOpen, setIsNotificationsOpen) => {
  setIsNotificationsOpen(!isNotificationsOpen)
}

/**
 * Calculate unread notifications count
 * @param {Array} notifications - Array of notification objects
 * @returns {number} Count of unread notifications
 */
export const getUnreadCount = (notifications) => {
  return notifications.filter(n => n.unread).length
}

