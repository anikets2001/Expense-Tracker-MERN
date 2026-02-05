import React from 'react'
import PropTypes from 'prop-types'

const SearchBar = ({ placeholder = "Search transactions...", className = "" }) => {
  return (
    <div className={`hidden md:block relative w-48 lg:w-64 border-r border-[#dbe6df] pr-6 ${className}`}>
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#61896f] text-xl">search</span>
      <input
        className="w-full pl-10 pr-4 py-2 bg-[#f0f4f2] dark:bg-[#1a2e1e] border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 text-[#111813] dark:text-white placeholder:text-[#61896f]"
        placeholder={placeholder}
        type="text"
      />
    </div>
  )
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string
}

export default SearchBar