import React from "react";

const SpendingChart = () => {
  return (
    <section className="bg-white dark:bg-black rounded-xl border border-[#dbe6df] dark:border-[#2a3a2e] p-4 md:p-6 shadow-sm">
      <h3 className="text-base md:text-lg font-bold text-[#111813] dark:text-white mb-4 md:mb-6">Spending Breakdown</h3>
      <div className="relative flex justify-center py-4">
        {/* Mock Doughnut Chart using CSS SVG */}
        <svg className="w-48 h-48 md:w-56 md:h-56 transform -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" fill="transparent" r="16" stroke="#f0f4f2" strokeWidth="4"></circle>
          {/* Housing: 40% - circumference = 2πr = 2π*16 ≈ 100.53 */}
          <circle cx="18" cy="18" fill="transparent" r="16" stroke="#13ec5b" strokeDasharray="40.212 60.318" strokeDashoffset="0" strokeWidth="4"></circle>
          {/* Food: 25% */}
          <circle cx="18" cy="18" fill="transparent" r="16" stroke="#3b82f6" strokeDasharray="25.133 75.397" strokeDashoffset="-40.212" strokeWidth="4"></circle>
          {/* Transport: 15% */}
          <circle cx="18" cy="18" fill="transparent" r="16" stroke="#f59e0b" strokeDasharray="15.08 85.45" strokeDashoffset="-65.345" strokeWidth="4"></circle>
          {/* Others: 20% */}
          <circle cx="18" cy="18" fill="transparent" r="16" stroke="#8b5cf6" strokeDasharray="20.106 80.424" strokeDashoffset="-80.425" strokeWidth="4"></circle>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold text-[#111813] dark:text-white">₹3.2k</span>
          <span className="text-[10px] font-bold text-[#61896f] uppercase tracking-wider">THIS MONTH</span>
        </div>
      </div>
      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-sm font-medium text-[#61896f]">Housing</span>
          </div>
          <span className="text-sm font-bold text-[#111813] dark:text-white">₹1,280 (40%)</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm font-medium text-[#61896f]">Food &amp; Drinks</span>
          </div>
          <span className="text-sm font-bold text-[#111813] dark:text-white">₹800 (25%)</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-sm font-medium text-[#61896f]">Transport</span>
          </div>
          <span className="text-sm font-bold text-[#111813] dark:text-white">₹480 (15%)</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm font-medium text-[#61896f]">Others</span>
          </div>
          <span className="text-sm font-bold text-[#111813] dark:text-white">₹640 (20%)</span>
        </div>
      </div>
    </section>
  );
};

export default SpendingChart;