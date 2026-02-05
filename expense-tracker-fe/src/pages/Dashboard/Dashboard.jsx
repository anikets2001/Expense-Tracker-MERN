import React, { useState } from 'react'
import Sidebar from '../../components/layout/Sidebar/Sidebar'
import Topbar from '../../components/layout/Topbar/Topbar'
import StatsRow from '../../components/dashboard/StatsRow/StatsRow'
import QuickAddForm from '../../components/dashboard/QuickAddForm/QuickAddForm'
import TransactionsTable from '../../components/dashboard/TransactionsTable/TransactionsTable'
import SpendingChart from '../../components/dashboard/SpendingChart/SpendingChart'
import SavingsGoal from '../../components/dashboard/SavingsGoal/SavingsGoal'

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark">
        <Topbar title={'Dashboard'} searchbar={true} onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="p-4 md:p-6 lg:p-8 mx-auto w-full space-y-6 md:space-y-8">
          <StatsRow />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-8">
              <QuickAddForm />
              <TransactionsTable />
            </div>

            <div className="lg:col-span-5 space-y-8">
              <SpendingChart />
              <SavingsGoal />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard