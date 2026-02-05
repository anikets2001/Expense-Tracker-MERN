import React from 'react'
import PropTypes from 'prop-types'
import { categories } from '../helpers'

const CategorySelect = ({ value, onChange, required = false }) => {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-bold text-[#111813] dark:text-white">
        Category {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 pr-10 bg-[#f0f4f2] dark:bg-[#1a2e1e] border border-[#dbe6df] dark:border-[#2a3a2e] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-[#111813] dark:text-white appearance-none cursor-pointer"
        required={required}
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}

CategorySelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool
}

export default CategorySelect

