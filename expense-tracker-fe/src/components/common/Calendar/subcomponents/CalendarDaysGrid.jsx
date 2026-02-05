import React from 'react'
import PropTypes from 'prop-types'

const CalendarDaysGrid = ({ calendarDays, onDateClick, isToday, isSelected, isFutureDate }) => {
  return (
    <div className="grid grid-cols-7 gap-1">
      {calendarDays.map((day, index) => {
        if (day === null) {
          return <div key={`empty-${index}`} className="aspect-square"></div>
        }
        
        const isTodayDate = isToday(day)
        const isSelectedDate = isSelected(day)
        const isFuture = isFutureDate(day)
        
        return (
          <button
            type="button"
            key={day}
            onClick={() => !isFuture && onDateClick(day)}
            disabled={isFuture}
            className={`aspect-square flex items-center justify-center text-sm font-bold rounded-lg transition-colors ${
              isFuture
                ? 'opacity-40 cursor-not-allowed text-[#61896f]'
                : isSelectedDate
                ? 'bg-primary text-black'
                : isTodayDate
                ? 'bg-primary/20 text-primary border-2 border-primary'
                : 'text-[#111813] dark:text-white hover:bg-[#f0f4f2] dark:hover:bg-[#102216]'
            }`}
          >
            {day}
          </button>
        )
      })}
    </div>
  )
}

CalendarDaysGrid.propTypes = {
  calendarDays: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])])).isRequired,
  onDateClick: PropTypes.func.isRequired,
  isToday: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  isFutureDate: PropTypes.func.isRequired
}

export default CalendarDaysGrid

