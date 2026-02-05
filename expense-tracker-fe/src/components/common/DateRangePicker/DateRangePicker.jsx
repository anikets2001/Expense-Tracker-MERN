import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Calendar from '../Calendar/Calendar'
import { quickFilters, handleQuickFilter, formatDateForDisplay } from './helpers'

const DateRangePicker = ({ startDate, endDate, onStartDateChange, onEndDateChange, onClose }) => {
  const [activePicker, setActivePicker] = useState('start') // 'start' or 'end'

  const onQuickFilter = (filter) => {
    handleQuickFilter(filter, onStartDateChange, onEndDateChange)
  }

  return (
    <div className="w-full sm:w-96 bg-white dark:bg-[#1a2e1e] rounded-lg shadow-xl border border-[#dbe6df] dark:border-[#2a3a2e] p-4 z-[100]">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-[#111813] dark:text-white mb-3">Quick Filters</h3>
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <button
              key={filter.label}
              type="button"
              onClick={() => onQuickFilter(filter)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#f0f4f2] dark:bg-[#102216] text-[#111813] dark:text-white hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#dbe6df] dark:border-[#2a3a2e] pt-4 space-y-4">
        <div>
          <label className="text-xs font-bold text-[#61896f] uppercase mb-2 block">Start Date</label>
          <div className="relative">
            <input
              readOnly
              value={formatDateForDisplay(startDate)}
              onClick={() => setActivePicker('start')}
              className={`w-full px-4 py-2.5 bg-[#f0f4f2] dark:bg-[#1a2e1e] border rounded-lg text-sm text-[#111813] dark:text-white cursor-pointer ${
                activePicker === 'start'
                  ? 'border-primary ring-2 ring-primary/50'
                  : 'border-[#dbe6df] dark:border-[#2a3a2e]'
              }`}
              placeholder="mm/dd/yyyy"
            />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#61896f] pointer-events-none">
              calendar_today
            </span>
            {activePicker === 'start' && (
              <div className="absolute top-full left-0 mt-2 z-50">
                <Calendar
                  value={startDate}
                  onChange={onStartDateChange}
                  isOpen={true}
                  onClose={() => setActivePicker(null)}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#61896f] uppercase mb-2 block">End Date</label>
          <div className="relative">
            <input
              readOnly
              value={formatDateForDisplay(endDate)}
              onClick={() => setActivePicker('end')}
              className={`w-full px-4 py-2.5 bg-[#f0f4f2] dark:bg-[#1a2e1e] border rounded-lg text-sm text-[#111813] dark:text-white cursor-pointer ${
                activePicker === 'end'
                  ? 'border-primary ring-2 ring-primary/50'
                  : 'border-[#dbe6df] dark:border-[#2a3a2e]'
              }`}
              placeholder="mm/dd/yyyy"
            />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#61896f] pointer-events-none">
              calendar_today
            </span>
            {activePicker === 'end' && (
              <div className="absolute top-full left-0 mt-2 z-50">
                <Calendar
                  value={endDate}
                  onChange={onEndDateChange}
                  isOpen={true}
                  onClose={() => setActivePicker(null)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#dbe6df] dark:border-[#2a3a2e] flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium rounded-lg text-[#61896f] hover:bg-[#f0f4f2] dark:hover:bg-[#102216] transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-bold rounded-lg bg-primary text-black hover:opacity-90 transition-opacity"
        >
          Apply
        </button>
      </div>
    </div>
  )
}

DateRangePicker.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default DateRangePicker