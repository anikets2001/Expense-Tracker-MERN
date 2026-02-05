import React from 'react'
import PropTypes from 'prop-types'

const DescriptionTextarea = ({ value, onChange, placeholder = "What did you buy? (Optional)", rows = 4 }) => {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-bold text-[#111813] dark:text-white">
        Description
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-4 py-3 bg-[#f0f4f2] dark:bg-[#1a2e1e] border border-[#dbe6df] dark:border-[#2a3a2e] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-[#111813] dark:text-white placeholder:text-[#61896f] resize-none"
        placeholder={placeholder}
      />
    </div>
  )
}

DescriptionTextarea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number
}

export default DescriptionTextarea

