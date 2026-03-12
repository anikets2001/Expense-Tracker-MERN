import React from 'react'
import { generatePageNumbers, formatPaginationInfo } from '../ExpenseTable/helpers'

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange 
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePageClick = (page) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page)
    }
  }

  const pageNumbers = generatePageNumbers(currentPage, totalPages)
  const paginationInfo = formatPaginationInfo(currentPage, itemsPerPage, totalItems)

  if (totalPages <= 1) {
    return null // Don't show pagination if there's only one page or no pages
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 md:px-6 py-3 md:py-2 bg-[#f0f4f2]/30 dark:bg-white/5 border-y border-[#dbe6df] dark:border-white/10">
      <p className="text-xs sm:text-sm text-[#61896f] text-center sm:text-left">
        {paginationInfo}
      </p>
      <div className="flex items-center gap-1 md:gap-2">
        <button 
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="cursor-pointer p-2 rounded border border-[#dbe6df] dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[#111813] dark:text-white text-sm md:text-base">chevron_left</span>
        </button>
        
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span 
                key={`ellipsis-${index}`} 
                className="px-1 md:px-2 text-[#111813] dark:text-white hidden md:inline"
              >
                ...
              </span>
            )
          }
          
          const isActive = page === currentPage
          const isFirstOrLast = page === 1 || page === totalPages
          const isNearCurrent = Math.abs(page - currentPage) <= 1
          
          return (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`cursor-pointer px-2 md:px-3 py-1 rounded text-xs md:text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-black font-bold'
                  : 'hover:bg-white dark:hover:bg-white/10 text-[#111813] dark:text-white'
              } ${
                // Responsive visibility: always show first, last, and current page
                // Show adjacent pages on sm+, show more on md+
                isFirstOrLast || isActive ? '' :
                isNearCurrent ? 'hidden sm:inline-block' :
                'hidden md:inline-block'
              }`}
            >
              {page}
            </button>
          )
        })}
        
        <button 
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="cursor-pointer flex items-center justify-center p-2 rounded border border-[#dbe6df] dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[#111813] dark:text-white text-sm md:text-base">chevron_right</span>
        </button>
      </div>
    </div>
  )
}

export default Pagination