import React from 'react'
import { monthNames } from '../config'

const CalendarHeader = ({ currentMonth, onPreviousMonth, onNextMonth, isCurrentMonthFuture }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <button
        type="button"
        onClick={onPreviousMonth}
        className="cursor-pointer p-2 hover:bg-[#f0f4f2] dark:hover:bg-[#102216] rounded-lg transition-colors"
      >
        <span className="material-symbols-outlined text-[#111813] dark:text-white">chevron_left</span>
      </button>
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-bold text-[#111813] dark:text-white">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
      </div>
      <button
        type="button"
        onClick={onNextMonth}
        disabled={isCurrentMonthFuture}
        className={`cursor-pointer p-2 rounded-lg transition-colors ${
          isCurrentMonthFuture
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-[#f0f4f2] dark:hover:bg-[#102216]'
        }`}
      >
        <span className="material-symbols-outlined text-[#111813] dark:text-white">chevron_right</span>
      </button>
    </div>
  )
}

export default CalendarHeader