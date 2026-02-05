import React from 'react'
import { transactions } from './config'
import TableHeader from './subcomponents/TableHeader'
import TableRow from './subcomponents/TableRow'

const ExpenseTable = () => {

  return (
    <div className="bg-white dark:bg-[#102216] border border-[#dbe6df] dark:border-white/10 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <div className="max-h-[calc(100vh-620px)] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <TableHeader />
            <tbody className="divide-y divide-[#dbe6df] dark:divide-white/10">
              {transactions.map((transaction, index) => (
                <TableRow key={index} transaction={transaction} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ExpenseTable