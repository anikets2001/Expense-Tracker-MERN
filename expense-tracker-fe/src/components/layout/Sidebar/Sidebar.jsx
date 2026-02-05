import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-white dark:bg-black border-r border-[#dbe6df] dark:border-[#2a3a2e] flex flex-col p-4 justify-between shrink-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-lg p-1.5 flex items-center justify-center">
              <span className="material-symbols-outlined text-black">account_balance_wallet</span>
            </div>
            <h1 className="text-[#111813] dark:text-white text-lg font-bold leading-normal">FinanceFlow</h1>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-[#f0f4f2] dark:hover:bg-[#1a2e1e] rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[#111813] dark:text-white">close</span>
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              location.pathname === '/dashboard'
                ? 'bg-primary/10 text-primary font-semibold'
                : 'text-[#61896f] hover:bg-[#f0f4f2] dark:hover:bg-[#1a2e1e]'
            }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link
            to="/transactions"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              location.pathname === '/transactions'
                ? 'bg-primary/10 text-primary font-semibold'
                : 'text-[#61896f] hover:bg-[#f0f4f2] dark:hover:bg-[#1a2e1e]'
            }`}
          >
            <span className="material-symbols-outlined">list_alt</span>
            <span className="text-sm">Transactions</span>
          </Link>
        </nav>
      </div>
      </aside>
    </>
  )
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Sidebar