import React from 'react'
import { dayNames } from '../config'

const DayNamesRow = () => {
  return (
    <div className="grid grid-cols-7 gap-1 mb-2">
      {dayNames.map((day) => (
        <div
          key={day}
          className="text-xs font-bold text-[#61896f] text-center py-2"
        >
          {day}
        </div>
      ))}
    </div>
  )
}

export default DayNamesRow