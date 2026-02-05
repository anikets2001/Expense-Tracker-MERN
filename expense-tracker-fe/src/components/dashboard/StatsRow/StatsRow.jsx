import React from "react";

const StatsRow = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="bg-white dark:bg-black p-4 md:p-6 rounded-xl border border-[#dbe6df] dark:border-[#2a3a2e] shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-[#61896f] text-sm font-semibold uppercase tracking-wider">Total Balance</p>
          <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg">account_balance</span>
        </div>
        <p className="text-[#111813] dark:text-white text-2xl md:text-3xl font-extrabold">₹12,450.00</p>
        <div className="flex items-center gap-1 mt-2">
          <span className="material-symbols-outlined text-[#078829] text-sm leading-none">trending_up</span>
          <span className="text-[#078829] text-sm font-bold">+2.5%</span>
          <span className="text-[#61896f] text-xs font-medium ml-1">vs last month</span>
        </div>
      </div>
      <div className="bg-white dark:bg-black p-6 rounded-xl border border-[#dbe6df] dark:border-[#2a3a2e] shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-[#61896f] text-sm font-semibold uppercase tracking-wider">Monthly Spending</p>
          <span className="material-symbols-outlined text-red-500 bg-red-500/10 p-1.5 rounded-lg">payments</span>
        </div>
        <p className="text-[#111813] dark:text-white text-2xl md:text-3xl font-extrabold">₹3,200.00</p>
        <div className="flex items-center gap-1 mt-2">
          <span className="material-symbols-outlined text-red-500 text-sm leading-none">trending_up</span>
          <span className="text-red-500 text-sm font-bold">+10%</span>
          <span className="text-[#61896f] text-xs font-medium ml-1">limit remaining: ₹800</span>
        </div>
      </div>
      <div className="bg-white dark:bg-black p-6 rounded-xl border border-[#dbe6df] dark:border-[#2a3a2e] shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <p className="text-[#61896f] text-sm font-semibold uppercase tracking-wider">Top Category</p>
          <span className="material-symbols-outlined text-blue-500 bg-blue-500/10 p-1.5 rounded-lg">restaurant</span>
        </div>
        <p className="text-[#111813] dark:text-white text-3xl font-extrabold">Food &amp; Drinks</p>
        <div className="flex items-center gap-1 mt-2">
          <span className="material-symbols-outlined text-[#078829] text-sm leading-none">trending_down</span>
          <span className="text-[#078829] text-sm font-bold">-5%</span>
          <span className="text-[#61896f] text-xs font-medium ml-1">avg. per transaction</span>
        </div>
      </div>
    </div>
  );
};

export default StatsRow;