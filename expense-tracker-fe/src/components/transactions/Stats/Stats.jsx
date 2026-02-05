import React from 'react'

const Stats = () => {
  return (
    <div className="flex flex-wrap gap-3 md:gap-4">
      <div className="flex min-w-[150px] sm:min-w-[200px] flex-1 flex-col gap-2 rounded-xl p-4 md:p-6 border border-[#dbe6df] dark:border-white/10 bg-white dark:bg-[#102216]">
        <div className="flex justify-between items-start">
          <p className="text-[#61896f] text-sm font-medium">Total Spent (June)</p>
          <span className="material-symbols-outlined text-[#111813] dark:text-white opacity-20">payments</span>
        </div>
        <p className="text-[#111813] dark:text-white text-2xl md:text-3xl font-bold tracking-tight">₹3,240.50</p>
        <p className="text-xs text-red-500 font-medium">+12% from last month</p>
      </div>
      <div className="flex min-w-[200px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe6df] dark:border-white/10 bg-white dark:bg-[#102216]">
        <div className="flex justify-between items-start">
          <p className="text-[#61896f] text-sm font-medium">Transactions</p>
          <span className="material-symbols-outlined text-[#111813] dark:text-white opacity-20">list_alt</span>
        </div>
        <p className="text-[#111813] dark:text-white text-2xl md:text-3xl font-bold tracking-tight">142</p>
        <p className="text-xs text-[#13ec5b] font-medium">-4% from last month</p>
      </div>
      <div className="flex min-w-[200px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe6df] dark:border-white/10 bg-white dark:bg-[#102216]">
        <div className="flex justify-between items-start">
          <p className="text-[#61896f] text-sm font-medium">Daily Average</p>
          <span className="material-symbols-outlined text-[#111813] dark:text-white opacity-20">analytics</span>
        </div>
        <p className="text-[#111813] dark:text-white text-2xl md:text-3xl font-bold tracking-tight">₹108.02</p>
        <p className="text-xs text-[#61896f]">Steady trend</p>
      </div>
    </div>
  )
}

export default Stats