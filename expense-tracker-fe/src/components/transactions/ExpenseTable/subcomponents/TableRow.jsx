import React from 'react'
import PropTypes from 'prop-types'
import { getCategoryClass } from '../helpers'

const TableRow = ({ transaction, index }) => {
  return (
    <tr key={index} className="hover:bg-[#f0f4f2]/30 dark:hover:bg-white/5 transition-colors group">
      <td className="px-3 md:px-6 py-4 text-xs md:text-sm font-medium text-[#111813] dark:text-white">{transaction.date}</td>
      <td className="px-3 md:px-6 py-4 hidden sm:table-cell">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${getCategoryClass(transaction.categoryColor)}`}>
          {transaction.category}
        </span>
      </td>
      <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-[#111813] dark:text-white/80">
        <div className="flex flex-col gap-1">
          <span>{transaction.description}</span>
          <span className={`sm:hidden inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold w-fit ${getCategoryClass(transaction.categoryColor)}`}>
            {transaction.category}
          </span>
        </div>
      </td>
      <td className="px-3 md:px-6 py-4 text-xs md:text-sm font-bold text-right text-[#111813] dark:text-white">{transaction.amount}</td>
      <td className="px-3 md:px-6 py-4 hidden md:table-cell">
        <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="cursor-pointer p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 text-[#61896f] hover:text-[#111813] dark:hover:text-white">
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>
          <button className="cursor-pointer p-1.5 rounded hover:bg-red-50 text-[#61896f] hover:text-red-500">
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      </td>
    </tr>
  )
}

TableRow.propTypes = {
  transaction: PropTypes.shape({
    date: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    categoryColor: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired
}

export default TableRow