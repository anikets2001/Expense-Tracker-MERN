import React from 'react'
import PropTypes from 'prop-types'

const AppliedFilters = ({ filters, onClearFilter, onClearAll }) => {
  if (filters.length === 0) return null

  return (
    <div className="flex gap-2 flex-wrap border-t border-[#dbe6df] dark:border-white/10 pt-4">
      <span className="text-xs font-bold text-[#61896f] uppercase self-center mr-2">Applied:</span>
      {filters.map((filter, index) => (
        <div key={index} className="flex h-8 items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3">
          <span className="text-xs font-semibold text-[#111813] dark:text-white">{filter.label}</span>
          <button
            type="button"
            onClick={() => onClearFilter(filter.type)}
            className="material-symbols-outlined text-sm hover:text-red-500 transition-colors"
          >
            close
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-xs font-bold text-primary hover:underline ml-auto"
      >
        Clear all filters
      </button>
    </div>
  )
}

AppliedFilters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  onClearFilter: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired
}

export default AppliedFilters