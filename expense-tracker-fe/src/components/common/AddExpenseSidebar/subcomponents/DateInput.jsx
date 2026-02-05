import React from 'react'
import PropTypes from 'prop-types'
import Calendar from '../../Calendar/Calendar'
import { formatDateForDisplay } from '../../../../utils/helpers'

const DateInput = ({ value, onChange, isCalendarOpen, onCalendarToggle, required = false }) => {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-bold text-[#111813] dark:text-white">
        Date {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          readOnly
          value={formatDateForDisplay(value, 'mm/dd/yyyy')}
          onClick={onCalendarToggle}
          className="w-full px-4 py-3 bg-[#f0f4f2] dark:bg-[#1a2e1e] border border-[#dbe6df] dark:border-[#2a3a2e] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-[#111813] dark:text-white pr-10 cursor-pointer"
          placeholder="mm/dd/yyyy"
          required={required}
        />
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#61896f] pointer-events-none">
          calendar_today
        </span>
        {isCalendarOpen && (
          <div className="absolute top-full left-0 mt-2 z-50">
            <Calendar
              value={value}
              onChange={onChange}
              isOpen={isCalendarOpen}
              onClose={onCalendarToggle}
            />
          </div>
        )}
      </div>
    </div>
  )
}

DateInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isCalendarOpen: PropTypes.bool.isRequired,
  onCalendarToggle: PropTypes.func.isRequired,
  required: PropTypes.bool
}

export default DateInput

