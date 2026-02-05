import React, { useState } from 'react'
import PageHeading from '../../components/transactions/PageHeading/PageHeading'
import Stats from '../../components/transactions/Stats/Stats'
import Filters from '../../components/transactions/Filters/Filters'
import ExpenseTable from '../../components/transactions/ExpenseTable/ExpenseTable'
import Pagination from '../../components/transactions/Pagination/Pagination'
import Sidebar from '../../components/layout/Sidebar/Sidebar'
import Topbar from '../../components/layout/Topbar/Topbar'

const Transactions = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 flex flex-col">
        <Topbar title={'Transactions'} onMenuClick={() => setIsSidebarOpen(true)} />
        <PageHeading />
        <div className="px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8 space-y-4 md:space-y-6">
          <Stats />
          <Filters />
          <ExpenseTable />
          <Pagination />
        </div>
      </main>
    </div>
  )
}

export default Transactions