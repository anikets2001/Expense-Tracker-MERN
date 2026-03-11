import React, { useMemo } from "react";
import { useGetExpenseStatsQuery } from "../../../redux/services/expensesApis";

const SpendingChart = () => {
  const { data, isLoading, error } = useGetExpenseStatsQuery();

  const categoryStats = data?.data?.categoryStats || [];
  const totalSpent = data?.data?.totalSpent || 0;

  // Category color mapping
  const categoryColors = {
    'Food & Drinks': '#3b82f6', // blue
    'Transport': '#f59e0b', // orange/amber
    'Housing': '#13ec5b', // green/primary
    'Entertainment': '#8b5cf6', // purple
    'Shopping': '#ec4899', // pink
    'Utilities': '#06b6d4', // cyan
    'Healthcare': '#ef4444', // red
    'Education': '#6366f1', // indigo
    'Travel': '#f59e0b', // amber
    'Other': '#8b5cf6' // purple
  };

  // Calculate SVG segments for donut chart
  const chartSegments = useMemo(() => {
    if (categoryStats.length === 0) return [];

    const circumference = 2 * Math.PI * 16; // r = 16
    let offset = 0;
    const segments = [];

    categoryStats.forEach((stat) => {
      const dashLength = (stat.percentage / 100) * circumference;
      const gapLength = circumference - dashLength;
      
      segments.push({
        ...stat,
        color: categoryColors[stat.category] || '#8b5cf6',
        dashArray: `${dashLength} ${gapLength}`,
        dashOffset: -offset
      });

      offset += dashLength;
    });

    return segments;
  }, [categoryStats]);

  // Format amount for display
  const formatAmount = (amount) => {
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}k`;
    }
    return `₹${amount.toLocaleString('en-IN', { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    })}`;
  };

  // Format full amount
  const formatFullAmount = (amount) => {
    return `₹${amount.toLocaleString('en-IN', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  return (
    <section className="bg-white dark:bg-black rounded-xl border border-[#dbe6df] dark:border-[#2a3a2e] p-4 md:p-6 shadow-sm">
      <h3 className="text-base md:text-lg font-bold text-[#111813] dark:text-white mb-4 md:mb-6">Spending Breakdown</h3>
      <div className="relative flex justify-center py-4">
        {isLoading ? (
          <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error || categoryStats.length === 0 ? (
          <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
            <p className="text-sm text-[#61896f]">No data available</p>
          </div>
        ) : (
          <>
            {/* Doughnut Chart using CSS SVG */}
            <svg className="w-48 h-48 md:w-56 md:h-56 transform -rotate-90" viewBox="0 0 36 36">
              {/* Background circle */}
              <circle cx="18" cy="18" fill="transparent" r="16" stroke="#f0f4f2" strokeWidth="4"></circle>
              {/* Category segments */}
              {chartSegments.map((segment, index) => (
                <circle
                  key={segment.category}
                  cx="18"
                  cy="18"
                  fill="transparent"
                  r="16"
                  stroke={segment.color}
                  strokeDasharray={segment.dashArray}
                  strokeDashoffset={segment.dashOffset}
                  strokeWidth="4"
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold text-[#111813] dark:text-white">
                {formatAmount(totalSpent)}
              </span>
              <span className="text-[10px] font-bold text-[#61896f] uppercase tracking-wider">TOTAL</span>
            </div>
          </>
        )}
      </div>
      <div className="mt-8 space-y-3">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-red-500 text-center">Failed to load data</p>
        ) : categoryStats.length === 0 ? (
          <p className="text-sm text-[#61896f] text-center">No expenses yet</p>
        ) : (
          categoryStats.map((stat) => (
            <div key={stat.category} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: categoryColors[stat.category] || '#8b5cf6' }}
                ></div>
                <span className="text-sm font-medium text-[#61896f]">{stat.category}</span>
              </div>
              <span className="text-sm font-bold text-[#111813] dark:text-white">
                {formatFullAmount(stat.total)} ({stat.percentage.toFixed(1)}%)
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default SpendingChart;