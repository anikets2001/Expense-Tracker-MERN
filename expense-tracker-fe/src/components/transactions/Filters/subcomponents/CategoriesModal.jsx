import React from 'react'
import { categories } from '../../Filters/config'

const CategoriesModal = ({ isOpen, selectedCategories, onToggleCategory, onClose, className = "" }) => {
  if (!isOpen) return null

  return (
    <div className={`absolute top-full right-0 mt-2 w-[calc(100vw-2rem)] sm:w-64 bg-white dark:bg-[#1a2e1e] rounded-lg shadow-xl border border-[#dbe6df] dark:border-[#2a3a2e] p-4 z-50 max-w-[calc(100vw-2rem)] ${className}`}>
      <h3 className="text-sm font-bold text-[#111813] dark:text-white mb-3">Select Categories</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f0f4f2] dark:hover:bg-[#102216] cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onToggleCategory(category)}
              className="w-4 h-4 rounded border-[#dbe6df] dark:border-[#2a3a2e] text-primary focus:ring-primary"
            />
            <span className="text-sm text-[#111813] dark:text-white">{category}</span>
          </label>
        ))}
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

export default CategoriesModal