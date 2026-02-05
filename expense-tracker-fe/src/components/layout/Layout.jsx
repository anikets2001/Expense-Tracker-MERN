import React from 'react'
import Topbar from './Topbar/Topbar'
import Sidebar from './Sidebar/Sidebar'
import StatsRow from '../dashboard/StatsRow/StatsRow'
import QuickAddForm from '../dashboard/QuickAddForm/QuickAddForm'
import TransactionsTable from '../dashboard/TransactionsTable/TransactionsTable'
import SpendingChart from '../dashboard/SpendingChart/SpendingChart'
import SavingsGoal from '../dashboard/SavingsGoal/SavingsGoal'

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark">
        <Topbar />

        <div className="p-8 max-w-[1200px] mx-auto w-full space-y-8">
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

export default Layout