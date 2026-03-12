import React from 'react'

const FilterButton = ({ icon, label, isOpen, isActive, onClick, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1 md:gap-2 rounded-lg bg-[#f0f4f2] dark:bg-white/5 px-3 md:px-4 h-10 md:h-11 text-xs md:text-sm font-medium transition-colors text-[#111813] dark:text-white ${
        isOpen || isActive
          ? 'border-2 border-primary'
          : 'border border-transparent hover:border-primary/50'
      } ${className}`}
    >
      <span className={`material-symbols-outlined ${icon === 'category' ? 'text-sm md:text-base' : 'text-base'}`}>
        {icon}
      </span>
      <span>{label}</span>
      <span className={`material-symbols-outlined ${icon === 'category' ? 'text-sm md:text-base' : 'text-base'} transition-transform ${isOpen ? 'rotate-180' : ''}`}>
        expand_more
      </span>
    </button>
  )
}

export default FilterButton