import React from 'react'

const Pagination = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 md:px-6 py-3 md:py-2 bg-[#f0f4f2]/30 dark:bg-white/5 border-y border-[#dbe6df] dark:border-white/10">
      <p className="text-xs sm:text-sm text-[#61896f] text-center sm:text-left">Showing 1 to 10 of 2,451 results</p>
      <div className="flex items-center gap-1 md:gap-2">
        <button className="cursor-pointer p-2 rounded border border-[#dbe6df] dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-colors disabled:opacity-30" disabled>
          <span className="material-symbols-outlined text-[#111813] dark:text-white text-sm md:text-base">chevron_left</span>
        </button>
        <button className="cursor-pointer px-2 md:px-3 py-1 rounded bg-primary text-black font-bold text-xs md:text-sm">1</button>
        <button className="cursor-pointer px-2 md:px-3 py-1 rounded hover:bg-white dark:hover:bg-white/10 text-xs md:text-sm font-medium text-[#111813] dark:text-white hidden sm:inline-block">2</button>
        <button className="cursor-pointer px-2 md:px-3 py-1 rounded hover:bg-white dark:hover:bg-white/10 text-xs md:text-sm font-medium text-[#111813] dark:text-white hidden md:inline-block">3</button>
        <span className="px-1 md:px-2 text-[#111813] dark:text-white hidden md:inline">...</span>
        <button className="cursor-pointer px-2 md:px-3 py-1 rounded hover:bg-white dark:hover:bg-white/10 text-xs md:text-sm font-medium text-[#111813] dark:text-white hidden lg:inline-block">246</button>
        <button className="cursor-pointer flex items-center justify-center p-2 rounded border border-[#dbe6df] dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-[#111813] dark:text-white text-sm md:text-base">chevron_right</span>
        </button>
      </div>
    </div>
  )
}

export default Pagination