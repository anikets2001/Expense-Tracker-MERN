import React from 'react'

const SidebarHeader = ({ title, onClose }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-[#dbe6df] dark:border-[#2a3a2e] sticky top-0 bg-white dark:bg-[#102216] z-10">
      <h2 className="text-xl font-bold text-[#111813] dark:text-white">{title}</h2>
      <button
        type="button"
        onClick={onClose}
        className="cursor-pointer p-2 hover:bg-[#f0f4f2] dark:hover:bg-[#1a2e1e] rounded-lg transition-colors"
      >
        <span className="material-symbols-outlined text-[#111813] dark:text-white">close</span>
      </button>
    </div>
  )
}

export default SidebarHeader

