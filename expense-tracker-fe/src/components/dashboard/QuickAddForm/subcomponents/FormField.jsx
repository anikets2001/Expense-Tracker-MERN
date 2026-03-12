import React from 'react'
import Calendar from '../../../common/Calendar/Calendar'
import { formatDateForDisplay } from '../../../../utils/helpers'

const FormField = ({ 
  type = 'text', 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  options = [],
  isCalendarOpen = false,
  onCalendarToggle,
  onCalendarClose,
  className = ""
}) => {
  const baseInputClasses = "w-full px-4 py-3 bg-[#f0f4f2] dark:bg-[#1a2e1e] border border-[#dbe6df] dark:border-[#2a3a2e] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-[#111813] dark:text-white placeholder:text-[#61896f]"

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-sm font-bold text-[#111813] dark:text-white">{label}</label>
      {type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseInputClasses} pr-10 appearance-none cursor-pointer`}
          required={required}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === 'date' ? (
        <div className="relative z-50">
          <input
            readOnly
            value={formatDateForDisplay(value, 'mm/dd/yyyy')}
            onClick={onCalendarToggle}
            className={`${baseInputClasses} pr-10 cursor-pointer`}
            placeholder={placeholder}
            required={required}
          />
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#61896f] pointer-events-none">
            calendar_today
          </span>
          {isCalendarOpen && (
            <Calendar
              value={value}
              onChange={onChange}
              isOpen={isCalendarOpen}
              onClose={onCalendarClose || onCalendarToggle}
            />
          )}
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseInputClasses}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  )
}

export default FormField