import React from 'react'

const AmountModal = ({ isOpen, minAmount, maxAmount, onMinAmountChange, onMaxAmountChange, onClose, className = "" }) => {
  if (!isOpen) return null

  return (
    <div className={`absolute top-full right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-white dark:bg-[#1a2e1e] rounded-lg shadow-xl border border-[#dbe6df] dark:border-[#2a3a2e] p-4 z-50 max-w-[calc(100vw-2rem)] ${className}`}>
      <h3 className="text-sm font-bold text-[#111813] dark:text-white mb-4">Amount Range</h3>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-[#61896f] uppercase mb-2 block">Minimum Amount (₹)</label>
          <input
            type="number"
            value={minAmount}
            onChange={(e) => onMinAmountChange(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-2.5 bg-[#f0f4f2] dark:bg-[#1a2e1e] border border-[#dbe6df] dark:border-[#2a3a2e] rounded-lg text-sm text-[#111813] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-[#61896f] uppercase mb-2 block">Maximum Amount (₹)</label>
          <input
            type="number"
            value={maxAmount}
            onChange={(e) => onMaxAmountChange(e.target.value)}
            placeholder="No limit"
            className="w-full px-4 py-2.5 bg-[#f0f4f2] dark:bg-[#1a2e1e] border border-[#dbe6df] dark:border-[#2a3a2e] rounded-lg text-sm text-[#111813] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-[#dbe6df] dark:border-[#2a3a2e] flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium rounded-lg text-[#61896f] hover:bg-[#f0f4f2] dark:hover:bg-[#102216] transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-bold rounded-lg bg-primary text-black hover:opacity-90 transition-opacity"
        >
          Apply
        </button>
      </div>
    </div>
  )
}

export default AmountModal