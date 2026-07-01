import React from "react";
import { formatCurrency } from "../../../utils/helpers.js";

const StatCard = ({ label, icon, value, subtext, isLoading, error }) => (
  <div className="flex min-w-[150px] sm:min-w-[180px] flex-1 flex-col gap-2 rounded-xl p-4 md:p-6 border border-[#dbe6df] dark:border-white/10 bg-white dark:bg-[#102216]">
    <div className="flex justify-between items-start">
      <p className="text-[#61896f] text-sm font-medium">{label}</p>
      <span className="material-symbols-outlined text-[#111813] dark:text-white opacity-20">
        {icon}
      </span>
    </div>
    {isLoading ? (
      <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
    ) : error ? (
      <p className="text-2xl md:text-3xl font-bold tracking-tight text-red-500">Error</p>
    ) : (
      <p className="text-[#111813] dark:text-white text-2xl md:text-3xl font-bold tracking-tight">
        {value}
      </p>
    )}
    {subtext && <p className="text-xs text-[#61896f]">{subtext}</p>}
  </div>
);

const now = new Date();
const currentMonthLabel = now.toLocaleString("en-IN", { month: "long", year: "numeric" });

const Stats = ({ stats, monthlyStats, isLoading, error }) => {
  return (
    <div className="flex flex-wrap gap-3 md:gap-4">
      <StatCard
        label={`Monthly Spending (${currentMonthLabel})`}
        icon="calendar_month"
        value={`₹${formatCurrency(monthlyStats.totalSpent, "en-IN")}`}
        subtext="Resets on the 1st of each month"
        isLoading={isLoading}
        error={error}
      />
      <StatCard
        label="Total Spending"
        icon="payments"
        value={`₹${formatCurrency(stats.totalSpent, "en-IN")}`}
        isLoading={isLoading}
        error={error}
      />
      <StatCard
        label="Transactions"
        icon="list_alt"
        value={stats.transactionCount.toLocaleString("en-IN")}
        isLoading={isLoading}
        error={error}
      />
      <StatCard
        label={`Monthly Average (${currentMonthLabel})`}
        icon="analytics"
        value={`₹${formatCurrency(monthlyStats.dailyAverage, "en-IN")}`}
        subtext="Daily average this month"
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default Stats;
