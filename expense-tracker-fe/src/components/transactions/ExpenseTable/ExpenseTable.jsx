import React, { useState, useMemo } from 'react'
import { useGetExpensesQuery, useDeleteExpenseMutation } from '../../../redux/services/expensesApis'
import { formatDate, formatAmount, getCategoryColor, buildSortBy } from './helpers'
import TableHeader from './subcomponents/TableHeader'
import TableRow from './subcomponents/TableRow'
import EditExpenseSidebar from '../../common/EditExpenseSidebar/EditExpenseSidebar'
import Pagination from '../Pagination/Pagination'

const ExpenseTable = ({ filters = {} }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState(null)
  const [sortField, setSortField] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')
  
  // Handle sort column click
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same column
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      // Set new column with ascending direction
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  // Build query parameters
  const queryParams = useMemo(() => {
    const sortBy = buildSortBy(sortField, sortDirection)
    return {
      page: currentPage,
      limit: 10,
      sortBy,
      ...filters
    }
  }, [currentPage, filters, sortField, sortDirection])

  // RTK Query hooks
  const { data, isLoading, error, refetch } = useGetExpensesQuery(queryParams)
  const [deleteExpense] = useDeleteExpenseMutation()

  const expenses = data?.data?.expenses || []
  const pagination = data?.data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  }

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  // Handle edit button click
  const handleEdit = (expense) => {
    setSelectedExpense(expense)
    setIsEditModalOpen(true)
  }

  // Handle delete button click
  const handleDelete = async (expenseId) => {
    // Show confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this expense? This action cannot be undone.')
    
    if (!confirmed) {
      return
    }

    try {
      await deleteExpense(expenseId).unwrap()
    } catch (error) {
      alert(error?.data?.message || error?.message || 'Failed to delete expense. Please try again.')
      console.error('Error deleting expense:', error)
    }
  }

  // Transform expense data for TableRow component
  const transformExpense = (expense) => {
    return {
      _id: expense._id,
      date: formatDate(expense.date),
      category: expense.category,
      categoryColor: getCategoryColor(expense.category),
      description: expense.description || 'No description',
      amount: formatAmount(expense.amount)
    }
  }

  return (
    <div className="bg-white dark:bg-[#102216] border border-[#dbe6df] dark:border-white/10 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <div className="max-h-[calc(100vh-620px)] overflow-y-auto">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-sm text-[#61896f]">Loading expenses...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-sm text-red-600 dark:text-red-400">
                {error?.data?.message || error?.message || 'Failed to load expenses'}
              </p>
              <button 
                onClick={() => refetch()}
                className="mt-2 text-sm text-primary hover:underline"
              >
                Try again
              </button>
            </div>
          ) : expenses.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm text-[#61896f]">No expenses found. Add your first expense!</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <TableHeader 
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              <tbody className="divide-y divide-[#dbe6df] dark:divide-white/10">
                {expenses.map((expense, index) => (
                  <TableRow 
                    key={expense._id} 
                    transaction={transformExpense(expense)} 
                    expense={expense}
                    index={index}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      {/* Pagination */}
      {!isLoading && !error && expenses.length > 0 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
      
      {/* Edit Expense Sidebar */}
      <EditExpenseSidebar
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedExpense(null)
        }}
        expense={selectedExpense}
      />
    </div>
  )
}

export default ExpenseTable