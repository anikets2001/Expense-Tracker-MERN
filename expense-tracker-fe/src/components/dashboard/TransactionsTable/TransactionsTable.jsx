import React from "react";
import { Link } from "react-router-dom";

const TransactionsTable = () => {
  return (
    <section className="bg-white dark:bg-black rounded-xl border border-[#dbe6df] dark:border-[#2a3a2e] overflow-hidden shadow-sm">
      <div className="p-4 md:p-6 flex justify-between items-center border-b border-[#dbe6df] dark:border-[#2a3a2e]">
        <h3 className="text-base md:text-lg font-bold text-[#111813] dark:text-white">Recent Transactions</h3>
        <Link to={'/transactions'} className="text-sm font-bold text-primary hover:underline">View All</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#f0f4f2] dark:bg-[#1a2e1e] border-b border-[#dbe6df] dark:border-[#2a3a2e]">
            <tr>
              <th className="px-3 md:px-6 py-4 text-xs font-bold text-[#61896f] uppercase tracking-wider">Recipient</th>
              <th className="px-3 md:px-6 py-4 text-xs font-bold text-[#61896f] uppercase tracking-wider hidden sm:table-cell">Category</th>
              <th className="px-3 md:px-6 py-4 text-xs font-bold text-[#61896f] uppercase tracking-wider">Date</th>
              <th className="px-3 md:px-6 py-4 text-xs font-bold text-[#61896f] uppercase tracking-wider text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dbe6df] dark:divide-[#2a3a2e]">
            <tr className="hover:bg-[#f0f4f2]/50 dark:hover:bg-[#1a2e1e]/50 transition-colors">
              <td className="px-3 md:px-6 py-4 flex items-center gap-2 md:gap-3">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined text-base md:text-lg">coffee</span>
                </div>
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <span className="text-xs md:text-sm font-bold text-[#111813] dark:text-white truncate">Starbucks Coffee</span>
                  <span className="sm:hidden text-xs font-bold bg-[#f0f4f2] dark:bg-[#1a2e1e] text-[#61896f] px-2 py-0.5 rounded w-fit">Food &amp; Drinks</span>
                </div>
              </td>
              <td className="px-3 md:px-6 py-4 hidden sm:table-cell">
                <span className="text-xs font-bold bg-[#f0f4f2] dark:bg-[#1a2e1e] text-[#61896f] px-2 py-1 rounded">Food &amp; Drinks</span>
              </td>
              <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-[#61896f]">Oct 24, 2023</td>
              <td className="px-3 md:px-6 py-4 text-xs md:text-sm font-bold text-[#111813] dark:text-white text-right">-₹5.45</td>
            </tr>
            <tr className="hover:bg-[#f0f4f2]/50 dark:hover:bg-[#1a2e1e]/50 transition-colors">
              <td className="px-3 md:px-6 py-4 flex items-center gap-2 md:gap-3">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0">
                  <span className="material-symbols-outlined text-base md:text-lg">electric_car</span>
                </div>
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <span className="text-xs md:text-sm font-bold text-[#111813] dark:text-white truncate">Uber Ride</span>
                  <span className="sm:hidden text-xs font-bold bg-[#f0f4f2] dark:bg-[#1a2e1e] text-[#61896f] px-2 py-0.5 rounded w-fit">Transport</span>
                </div>
              </td>
              <td className="px-3 md:px-6 py-4 hidden sm:table-cell">
                <span className="text-xs font-bold bg-[#f0f4f2] dark:bg-[#1a2e1e] text-[#61896f] px-2 py-1 rounded">Transport</span>
              </td>
              <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-[#61896f]">Oct 23, 2023</td>
              <td className="px-3 md:px-6 py-4 text-xs md:text-sm font-bold text-[#111813] dark:text-white text-right">-₹18.20</td>
            </tr>
            <tr className="hover:bg-[#f0f4f2]/50 dark:hover:bg-[#1a2e1e]/50 transition-colors">
              <td className="px-3 md:px-6 py-4 flex items-center gap-2 md:gap-3">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0">
                  <span className="material-symbols-outlined text-base md:text-lg">house</span>
                </div>
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <span className="text-xs md:text-sm font-bold text-[#111813] dark:text-white truncate">Monthly Rent</span>
                  <span className="sm:hidden text-xs font-bold bg-[#f0f4f2] dark:bg-[#1a2e1e] text-[#61896f] px-2 py-0.5 rounded w-fit">Housing</span>
                </div>
              </td>
              <td className="px-3 md:px-6 py-4 hidden sm:table-cell">
                <span className="text-xs font-bold bg-[#f0f4f2] dark:bg-[#1a2e1e] text-[#61896f] px-2 py-1 rounded">Housing</span>
              </td>
              <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-[#61896f]">Oct 21, 2023</td>
              <td className="px-3 md:px-6 py-4 text-xs md:text-sm font-bold text-[#111813] dark:text-white text-right">-₹1,200.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TransactionsTable;