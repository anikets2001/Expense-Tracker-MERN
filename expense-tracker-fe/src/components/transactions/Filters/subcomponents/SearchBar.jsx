import React from 'react'
import PropTypes from 'prop-types'

const SearchBar = ({ placeholder = "Search by merchant, description, or tag...", className = "" }) => {
  return (
    <div className={`flex-1 min-w-full sm:min-w-[200px] md:min-w-[300px] ${className}`}>
      <label className="flex items-center bg-[#f0f4f2] dark:bg-white/5 rounded-lg px-4 h-11 border border-transparent focus-within:border-primary transition-all">
        <span className="material-symbols-outlined text-[#61896f]">search</span>
        <input
          className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-[#61896f] text-[#111813] dark:text-white"
          placeholder={placeholder}
          type="text"
        />
      </label>
    </div>
  )
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string
}

export default SearchBar