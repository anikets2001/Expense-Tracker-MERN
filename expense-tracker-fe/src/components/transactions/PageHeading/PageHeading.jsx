import React, { useState } from 'react'
import AddExpenseSidebar from '../../common/AddExpenseSidebar/AddExpenseSidebar'

const PageHeading = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-[#111813] dark:text-white text-2xl md:text-3xl lg:text-4xl font-black tracking-tight">Expense History</h2>
          <p className="text-[#61896f] text-sm md:text-base font-normal">Review and manage your financial records from 2,451 total entries.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="cursor-pointer flex items-center justify-center gap-2 rounded-lg h-10 md:h-12 px-4 md:px-6 bg-primary text-black text-xs md:text-sm font-bold tracking-wide shadow-sm hover:brightness-105 active:scale-95 transition-all w-full sm:w-auto"
        >
          <span className="material-symbols-outlined text-lg md:text-xl">add</span>
          <span>Add Expense</span>
        </button>
      </div>
      <AddExpenseSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  )
}

export default PageHeading