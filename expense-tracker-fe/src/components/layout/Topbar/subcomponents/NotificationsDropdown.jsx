import React from 'react'
import { notifications } from '../config'
import { getUnreadCount } from '../helpers'

const NotificationsDropdown = ({ isOpen, onClose }) => {
  const unreadCount = getUnreadCount(notifications)

  if (!isOpen) return null

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 sm:hidden"
        onClick={onClose}
      />
      <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white dark:bg-[#1a2e1e] rounded-lg shadow-xl border border-[#dbe6df] dark:border-[#2a3a2e] overflow-hidden z-50">
        <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-[#dbe6df] dark:border-[#2a3a2e] flex items-center justify-between sticky top-0 bg-white dark:bg-[#1a2e1e]">
          <h3 className="text-xs sm:text-sm font-bold text-[#111813] dark:text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="max-h-[60vh] sm:max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <span className="material-symbols-outlined text-[#61896f] text-4xl mb-2">notifications_off</span>
              <p className="text-sm text-[#61896f]">No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-3 sm:px-4 py-2.5 sm:py-3 border-b border-[#dbe6df] dark:border-[#2a3a2e] hover:bg-[#f0f4f2] dark:hover:bg-[#102216] transition-colors cursor-pointer ${
                  notification.unread ? 'bg-primary/5 dark:bg-primary/10' : ''
                }`}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notification.type === 'expense' ? 'bg-red-500/10 text-red-500' :
                    notification.type === 'budget' ? 'bg-orange-500/10 text-orange-500' :
                    notification.type === 'goal' ? 'bg-primary/10 text-primary' :
                    'bg-blue-500/10 text-blue-500'
                  }`}>
                    <span className="material-symbols-outlined text-base sm:text-lg">
                      {notification.type === 'expense' ? 'payments' :
                       notification.type === 'budget' ? 'account_balance_wallet' :
                       notification.type === 'goal' ? 'savings' :
                       'check_circle'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs sm:text-sm font-bold text-[#111813] dark:text-white">
                        {notification.title}
                      </p>
                      {notification.unread && (
                        <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></span>
                      )}
                    </div>
                    <p className="text-xs text-[#61896f] mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-[#61896f] mt-1 sm:mt-1.5">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {notifications.length > 0 && (
          <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-[#dbe6df] dark:border-[#2a3a2e] sticky bottom-0 bg-white dark:bg-[#1a2e1e]">
            <button
              type="button"
              className="w-full text-xs sm:text-sm font-bold text-primary hover:underline text-center"
            >
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default NotificationsDropdown