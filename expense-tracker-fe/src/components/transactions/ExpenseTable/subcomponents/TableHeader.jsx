import React from 'react'

const TableHeader = () => {
  return (
    <thead className="sticky top-0 z-10">
      <tr className="bg-[#f0f4f2]/50 dark:bg-white/5 border-b border-[#dbe6df] dark:border-white/10">
        <th className="px-3 md:px-6 py-4 text-xs font-bold text-[#61896f] uppercase tracking-wider bg-[#f0f4f2]/50 dark:bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#111813] dark:hover:text-white">
            Date <span className="material-symbols-outlined text-sm hidden sm:inline">arrow_downward</span>
          </div>
        </th>
        <th className="px-3 md:px-6 py-4 text-xs font-bold text-[#61896f] uppercase tracking-wider bg-[#f0f4f2]/50 dark:bg-white/5 backdrop-blur-sm hidden sm:table-cell">Category</th>
        <th className="px-3 md:px-6 py-4 text-xs font-bold text-[#61896f] uppercase tracking-wider bg-[#f0f4f2]/50 dark:bg-white/5 backdrop-blur-sm">Description</th>
        <th className="px-3 md:px-6 py-4 text-xs font-bold text-[#61896f] uppercase tracking-wider text-right bg-[#f0f4f2]/50 dark:bg-white/5 backdrop-blur-sm">Amount</th>
        <th className="px-3 md:px-6 py-4 text-xs font-bold text-[#61896f] uppercase tracking-wider text-center bg-[#f0f4f2]/50 dark:bg-white/5 backdrop-blur-sm hidden md:table-cell">Actions</th>
      </tr>
    </thead>
  )
}

export default TableHeader