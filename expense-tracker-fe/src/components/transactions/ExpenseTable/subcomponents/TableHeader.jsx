import React from 'react'
import { getSortIcon, getSortIconClass } from '../helpers'

const TableHeader = ({ sortField, sortDirection, onSort }) => {
  const handleDateSort = () => {
    onSort('date')
  }

  const handleAmountSort = () => {
    onSort('amount')
  }

  return (
    <thead className="sticky top-0 z-10">
      <tr className="bg-[#f0f4f2]/50 dark:bg-white/5 border-b border-[#dbe6df] dark:border-white/10">
        <th className="px-3 md:px-6 py-4 text-xs font-bold text-[#61896f] uppercase tracking-wider bg-[#f0f4f2]/50 dark:bg-white/5 backdrop-blur-sm">
          <div 
            className="flex items-center gap-1 cursor-pointer hover:text-[#111813] dark:hover:text-white transition-colors"
            onClick={handleDateSort}
          >
            Date 
            <span className={getSortIconClass('date', sortField)}>
              {getSortIcon('date', sortField, sortDirection)}
            </span>
          </div>
        </th>
        <th className="px-3 md:px-6 py-4 text-xs font-bold text-[#61896f] uppercase tracking-wider bg-[#f0f4f2]/50 dark:bg-white/5 backdrop-blur-sm hidden sm:table-cell">Category</th>
        <th className="px-3 md:px-6 py-4 text-xs font-bold text-[#61896f] uppercase tracking-wider bg-[#f0f4f2]/50 dark:bg-white/5 backdrop-blur-sm">Description</th>
        <th className="px-3 md:px-6 py-4 text-xs font-bold text-[#61896f] uppercase tracking-wider text-right bg-[#f0f4f2]/50 dark:bg-white/5 backdrop-blur-sm">
          <div 
            className="flex items-center gap-1 cursor-pointer hover:text-[#111813] dark:hover:text-white transition-colors"
            onClick={handleAmountSort}
          >
            <p>Amount</p>
            <span className={getSortIconClass('amount', sortField)}>
              {getSortIcon('amount', sortField, sortDirection)}
            </span>
          </div>
        </th>
        <th className="px-3 md:px-6 py-4 text-xs font-bold text-[#61896f] uppercase tracking-wider text-center bg-[#f0f4f2]/50 dark:bg-white/5 backdrop-blur-sm hidden md:table-cell">Actions</th>
      </tr>
    </thead>
  )
}

export default TableHeader