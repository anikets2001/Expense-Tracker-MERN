import React, { useState, useEffect, useRef } from 'react'
import { getExpenses } from '../../../services/expenseService'
import { formatDate, formatAmount, getCategoryColor } from './helpers'
import TableHeader from './subcomponents/TableHeader'
import TableRow from './subcomponents/TableRow'
import EditExpenseSidebar from '../../common/EditExpenseSidebar/EditExpenseSidebar'

const ExpenseTable = ({ filters = {} }) => {
  const [expenses, setExpenses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  })
  
  // Use ref to track previous filters and prevent infinite loop
  const prevFiltersRef = useRef(JSON.stringify(filters))
  const isInitialMount = useRef(true)
  const isFetchingRef = useRef(false)
  
  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState(null)

  useEffect(() => {
    // Only fetch on mount or when filters actually change
    const currentFilters = JSON.stringify(filters)
    
    if (isInitialMount.current) {
      isInitialMount.current = false
      fetchExpenses(1)
    } else if (prevFiltersRef.current !== currentFilters) {
      prevFiltersRef.current = currentFilters
      fetchExpenses(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const fetchExpenses = async (page = 1) => {
    // Prevent multiple simultaneous requests
    if (isFetchingRef.current) return
    
    isFetchingRef.current = true
    
    try {
      setIsLoading(true)
      setError(null)
      
      const params = {
        page,
        limit: 10,
        sortBy: '-date',
        ...filters
      }

      const response = await getExpenses(params)
      
      if (response.success) {
        setExpenses(response.data.expenses)
        setPagination(response.data.pagination)
      }
    } catch (err) {
      setError(err.message)
      console.error('Error fetching expenses:', err)
    } finally {
      setIsLoading(false)
      isFetchingRef.current = false
    }
  }

  // Handle edit button click
  const handleEdit = (expense) => {
    setSelectedExpense(expense)
    setIsEditModalOpen(true)
  }

  // Handle successful update
  const handleUpdateSuccess = () => {
    // Refresh expenses after update
    fetchExpenses(pagination.currentPage)
  }

  // Handle delete button click
  const handleDelete = async (expenseId) => {
    // Show confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this expense? This action cannot be undone.')
    
    if (!confirmed) {
      return
    }

    try {
      const { deleteExpense } = await import('../../../services/expenseService')
      const response = await deleteExpense(expenseId)
      
      if (response.success) {
        // Refresh expenses after deletion
        fetchExpenses(pagination.currentPage)
      }
    } catch (error) {
      alert(error.message || 'Failed to delete expense. Please try again.')
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
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              <button 
                onClick={() => fetchExpenses(pagination.currentPage)}
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
              <TableHeader />
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
      
      {/* Edit Expense Sidebar */}
      <EditExpenseSidebar
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedExpense(null)
        }}
        expense={selectedExpense}
        onSuccess={handleUpdateSuccess}
      />
    </div>
  )
}

export default ExpenseTable