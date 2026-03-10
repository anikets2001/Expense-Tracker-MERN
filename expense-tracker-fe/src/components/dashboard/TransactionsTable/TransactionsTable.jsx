import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Link } from "react-router-dom";
import { getExpenses } from "../../../services/expenseService";
import { formatDate, formatAmount, getCategoryColor, getCategoryClass } from "../../transactions/ExpenseTable/helpers";

const TransactionsTable = forwardRef((props, ref) => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecentExpenses();
  }, []);

  // Expose refresh method to parent component
  useImperativeHandle(ref, () => ({
    refresh: () => {
      fetchRecentExpenses();
    }
  }));

  const fetchRecentExpenses = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getExpenses({ 
        limit: 5, 
        sortBy: '-date' 
      });
      
      if (response.success) {
        setExpenses(response.data.expenses);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching expenses:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Food & Drinks': 'restaurant',
      'Transport': 'directions_car',
      'Housing': 'home',
      'Entertainment': 'movie',
      'Shopping': 'shopping_bag',
      'Utilities': 'bolt',
      'Healthcare': 'local_hospital',
      'Education': 'school',
      'Travel': 'flight',
      'Other': 'category'
    };
    return iconMap[category] || 'category';
  };

  return (
    <section className="bg-white dark:bg-black rounded-xl border border-[#dbe6df] dark:border-[#2a3a2e] overflow-hidden shadow-sm">
      <div className="p-4 md:p-6 flex justify-between items-center border-b border-[#dbe6df] dark:border-[#2a3a2e]">
        <h3 className="text-base md:text-lg font-bold text-[#111813] dark:text-white">Recent Transactions</h3>
        <Link to={'/transactions'} className="text-sm font-bold text-primary hover:underline">View All</Link>
      </div>
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-sm text-[#61896f]">Loading transactions...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            <button 
              onClick={fetchRecentExpenses}
              className="mt-2 text-sm text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        ) : expenses.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-[#61896f]">No transactions yet. Add your first expense!</p>
          </div>
        ) : (
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
              {expenses.map((expense) => {
                const categoryColor = getCategoryColor(expense.category);
                const categoryClass = getCategoryClass(categoryColor);
                const icon = getCategoryIcon(expense.category);
                
                // Get icon background color class
                const iconBgClass = {
                  blue: 'bg-blue-500/20 text-blue-500',
                  purple: 'bg-purple-500/20 text-purple-500',
                  amber: 'bg-amber-500/20 text-amber-500',
                  primary: 'bg-primary/20 text-primary',
                  cyan: 'bg-cyan-500/20 text-cyan-500'
                }[categoryColor] || 'bg-blue-500/20 text-blue-500';
                
                return (
                  <tr key={expense._id} className="hover:bg-[#f0f4f2]/50 dark:hover:bg-[#1a2e1e]/50 transition-colors">
                    <td className="px-3 md:px-6 py-4 flex items-center gap-2 md:gap-3">
                      <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iconBgClass}`}>
                        <span className="material-symbols-outlined text-base md:text-lg">{icon}</span>
                      </div>
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <span className="text-xs md:text-sm font-bold text-[#111813] dark:text-white truncate">
                          {expense.description || 'No description'}
                        </span>
                        <span className={`sm:hidden text-xs font-bold px-2 py-0.5 rounded w-fit ${categoryClass}`}>
                          {expense.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-4 hidden sm:table-cell">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${categoryClass}`}>
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-[#61896f]">
                      {formatDate(expense.date)}
                    </td>
                    <td className="px-3 md:px-6 py-4 text-xs md:text-sm font-bold text-[#111813] dark:text-white text-right">
                      -{formatAmount(expense.amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
});

TransactionsTable.displayName = 'TransactionsTable';

export default TransactionsTable;