import React from 'react'
import { formatDateForDisplay } from '../helpers'

const CalendarFooter = ({ value, onGoToToday }) => {
  return (
    <div className="mt-4 pt-4 border-t border-[#dbe6df] dark:border-[#2a3a2e] flex items-center justify-between">
      <button
        type="button"
        onClick={onGoToToday}
        className="text-sm font-bold text-primary hover:underline"
      >
        Today
      </button>
      {value && (
        <span className="text-xs text-[#61896f]">
          Selected: {formatDateForDisplay(value)}
        </span>
      )}
    </div>
  )
}

export default CalendarFooter