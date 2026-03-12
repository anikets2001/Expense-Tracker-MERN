import React, { useState, useMemo, useEffect } from 'react'
import PageHeading from '../../components/transactions/PageHeading/PageHeading'
import Stats from '../../components/transactions/Stats/Stats'
import Filters from '../../components/transactions/Filters/Filters'
import ExpenseTable from '../../components/transactions/ExpenseTable/ExpenseTable'
import Sidebar from '../../components/layout/Sidebar/Sidebar'
import Topbar from '../../components/layout/Topbar/Topbar'
import { useGetExpenseStatsQuery } from '../../redux/services/expensesApis'

const Transactions = () => {
  const { data, isLoading: isLoadingStats, error: errorStats } = useGetExpenseStatsQuery()

  const stats = data?.data || {
    totalSpent: 0,
    transactionCount: 0,
    dailyAverage: 0
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // Filter state
  const [searchInput, setSearchInput] = useState('') // Local state for input
  const [search, setSearch] = useState('') // Debounced search value
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [minAmount, setMinAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')

  // Debounce search input - wait 500ms after user stops typing
  // Clear immediately if input is empty
  useEffect(() => {
    if (searchInput.trim() === '') {
      setSearch('')
      return
    }

    const timer = setTimeout(() => {
      setSearch(searchInput)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchInput])

  // Build filters object for ExpenseTable
  const filters = useMemo(() => {
    const filterObj = {}
    
    if (search && search.trim()) {
      filterObj.search = search.trim()
    }
    
    if (startDate) {
      filterObj.startDate = startDate
    }
    
    if (endDate) {
      filterObj.endDate = endDate
    }
    
    // Handle category filter - if multiple categories selected, we'll need to handle it
    // For now, if only one category is selected, use it. Otherwise, we might need to modify backend
    if (selectedCategories.length === 1) {
      filterObj.category = selectedCategories[0]
    }
    
    // Add amount range filtering
    if (minAmount && minAmount.trim()) {
      filterObj.minAmount = minAmount.trim()
    }
    
    if (maxAmount && maxAmount.trim()) {
      filterObj.maxAmount = maxAmount.trim()
    }
    
    return filterObj
  }, [search, startDate, endDate, selectedCategories, minAmount, maxAmount])

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 flex flex-col">
        <Topbar title={'Transactions'} onMenuClick={() => setIsSidebarOpen(true)} />
        <PageHeading transactionCount={stats.transactionCount} />
        <div className="px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8 space-y-4 md:space-y-6">
          <Stats stats={stats} isLoading={isLoadingStats} error={errorStats}/>
          <Filters 
            search={searchInput}
            onSearchChange={setSearchInput}
            startDate={startDate}
            onStartDateChange={setStartDate}
            endDate={endDate}
            onEndDateChange={setEndDate}
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
            minAmount={minAmount}
            onMinAmountChange={setMinAmount}
            maxAmount={maxAmount}
            onMaxAmountChange={setMaxAmount}
          />
          <ExpenseTable filters={filters} />
        </div>
      </main>
    </div>
  )
}

export default Transactions