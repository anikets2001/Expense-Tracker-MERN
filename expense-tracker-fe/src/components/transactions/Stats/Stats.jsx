import React from "react";

const Stats = ({ stats, isLoading, error }) => {
  // Format amount for display
  const formatAmount = (amount) => {
    return `₹${amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="flex flex-wrap gap-3 md:gap-4">
      <div className="flex min-w-[150px] sm:min-w-[200px] flex-1 flex-col gap-2 rounded-xl p-4 md:p-6 border border-[#dbe6df] dark:border-white/10 bg-white dark:bg-[#102216]">
        <div className="flex justify-between items-start">
          <p className="text-[#61896f] text-sm font-medium">Total Spent</p>
          <span className="material-symbols-outlined text-[#111813] dark:text-white opacity-20">
            payments
          </span>
        </div>
        {isLoading ? (
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
        ) : error ? (
          <p className="text-[#111813] dark:text-white text-2xl md:text-3xl font-bold tracking-tight text-red-500">
            Error
          </p>
        ) : (
          <p className="text-[#111813] dark:text-white text-2xl md:text-3xl font-bold tracking-tight">
            {formatAmount(stats.totalSpent)}
          </p>
        )}
        {/* <p className="text-xs text-red-500 font-medium">+12% from last month</p> */}
      </div>
      <div className="flex min-w-[200px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe6df] dark:border-white/10 bg-white dark:bg-[#102216]">
        <div className="flex justify-between items-start">
          <p className="text-[#61896f] text-sm font-medium">Transactions</p>
          <span className="material-symbols-outlined text-[#111813] dark:text-white opacity-20">
            list_alt
          </span>
        </div>
        {isLoading ? (
          <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
        ) : error ? (
          <p className="text-[#111813] dark:text-white text-2xl md:text-3xl font-bold tracking-tight text-red-500">
            Error
          </p>
        ) : (
          <p className="text-[#111813] dark:text-white text-2xl md:text-3xl font-bold tracking-tight">
            {stats.transactionCount.toLocaleString("en-IN")}
          </p>
        )}
        {/* <p className="text-xs text-[#13ec5b] font-medium">-4% from last month</p> */}
      </div>
      <div className="flex min-w-[200px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe6df] dark:border-white/10 bg-white dark:bg-[#102216]">
        <div className="flex justify-between items-start">
          <p className="text-[#61896f] text-sm font-medium">Daily Average</p>
          <span className="material-symbols-outlined text-[#111813] dark:text-white opacity-20">
            analytics
          </span>
        </div>
        {isLoading ? (
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
        ) : error ? (
          <p className="text-[#111813] dark:text-white text-2xl md:text-3xl font-bold tracking-tight text-red-500">
            Error
          </p>
        ) : (
          <p className="text-[#111813] dark:text-white text-2xl md:text-3xl font-bold tracking-tight">
            {formatAmount(stats.dailyAverage)}
          </p>
        )}
        <p className="text-xs text-[#61896f]">Steady trend</p>
      </div>
    </div>
  );
};

export default Stats;
