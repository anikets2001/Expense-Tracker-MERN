import React from 'react'

const AmountInput = ({ value, onChange, required = false }) => {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-bold text-[#111813] dark:text-white">
        Amount ₹ {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="number"
        step="0.01"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-[#f0f4f2] dark:bg-[#1a2e1e] border border-[#dbe6df] dark:border-[#2a3a2e] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-[#111813] dark:text-white placeholder:text-[#61896f]"
        placeholder="0.00"
        required={required}
      />
    </div>
  )
}

export default AmountInput

