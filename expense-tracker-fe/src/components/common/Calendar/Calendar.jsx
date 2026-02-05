import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import useClickAwayListener from '../../../hooks/useClickAwayListener'
import {
  handleDateClick as handleDateClickHelper,
  goToPreviousMonth as goToPreviousMonthHelper,
  goToNextMonth as goToNextMonthHelper,
  goToToday as goToTodayHelper,
  isToday as isTodayHelper,
  isSelected as isSelectedHelper,
  isFutureDate as isFutureDateHelper,
  isCurrentMonthFuture as isCurrentMonthFutureHelper
} from './helpers'
import CalendarHeader from './subcomponents/CalendarHeader'
import DayNamesRow from './subcomponents/DayNamesRow'
import CalendarDaysGrid from './subcomponents/CalendarDaysGrid'
import CalendarFooter from './subcomponents/CalendarFooter'

const Calendar = ({ value, onChange, isOpen, onClose }) => {
  const calendarRef = React.useRef(null)
  const [userNavigatedMonth, setUserNavigatedMonth] = useState(null)
  const prevIsOpenRef = React.useRef(false)
  
  useClickAwayListener(calendarRef, onClose, isOpen)

  // Reset navigation state when calendar closes
  React.useEffect(() => {
    if (!isOpen && prevIsOpenRef.current) {
      setUserNavigatedMonth(null)
    }
    prevIsOpenRef.current = isOpen
  }, [isOpen])

  // Compute current month: use navigated month if user has navigated, otherwise use value or today
  const currentMonth = useMemo(() => {
    if (userNavigatedMonth) {
      return userNavigatedMonth
    }
    if (value) {
      return new Date(value)
    }
    return new Date()
  }, [userNavigatedMonth, value])

  // Get the selected date or today's date
  // const selectedDate = value ? new Date(value) : new Date()
  
  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()

  const handleDateClick = (day) => {
    handleDateClickHelper(day, currentMonth, onChange, onClose)
  }

  const goToPreviousMonth = () => {
    goToPreviousMonthHelper(currentMonth, setUserNavigatedMonth)
  }

  const goToNextMonth = () => {
    goToNextMonthHelper(currentMonth, setUserNavigatedMonth)
  }

  const goToToday = () => {
    goToTodayHelper(onChange, onClose, setUserNavigatedMonth)
  }

  const isToday = (day) => {
    return isTodayHelper(day, currentMonth)
  }

  const isSelected = (day) => {
    return isSelectedHelper(day, value, currentMonth)
  }

  const isFutureDate = (day) => {
    return isFutureDateHelper(day, currentMonth)
  }

  const isCurrentMonthFuture = () => {
    return isCurrentMonthFutureHelper(currentMonth)
  }

  // Generate calendar days
  const calendarDays = []
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  if (!isOpen) return null

  return (
    <div 
      ref={calendarRef}
      className="absolute top-full left-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-white dark:bg-[#1a2e1e] rounded-lg shadow-xl border border-[#dbe6df] dark:border-[#2a3a2e] p-3 md:p-4 z-[100] max-w-[calc(100vw-2rem)]"
    >
      <CalendarHeader
        currentMonth={currentMonth}
        onPreviousMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
        isCurrentMonthFuture={isCurrentMonthFuture()}
      />

      <DayNamesRow />

      <CalendarDaysGrid
        calendarDays={calendarDays}
        onDateClick={handleDateClick}
        isToday={isToday}
        isSelected={isSelected}
        isFutureDate={isFutureDate}
      />

      <CalendarFooter
        value={value}
        onGoToToday={goToToday}
      />
    </div>
  )
}

Calendar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Calendar