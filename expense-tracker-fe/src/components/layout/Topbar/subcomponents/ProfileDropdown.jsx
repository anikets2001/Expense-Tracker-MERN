import React from 'react'

const ProfileDropdown = ({ isOpen, userName = "Alex Rivera", userEmail = "alex.rivera@example.com", userRole = "Premium Member" }) => {
  if (!isOpen) return null

  return (
    <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-56 bg-white dark:bg-[#1a2e1e] rounded-lg shadow-lg border border-[#dbe6df] dark:border-[#2a3a2e] overflow-hidden z-50 max-w-[calc(100vw-2rem)]">
      <div className="px-4 py-3 border-b border-[#dbe6df] dark:border-[#2a3a2e]">
        <p className="text-sm font-bold text-[#111813] dark:text-white">{userName}</p>
        <p className="text-xs text-[#61896f] font-medium mt-0.5">{userEmail}</p>
        {userRole && <p className="text-xs text-[#61896f] font-medium mt-0.5">{userRole}</p>}
      </div>
      <div className="py-1">
        <button type="button" className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#111813] dark:text-white hover:bg-[#f0f4f2] dark:hover:bg-[#102216] transition-colors">
          <span className="material-symbols-outlined text-xl">person</span>
          <span>Profile</span>
        </button>
        <button type="button" className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#111813] dark:text-white hover:bg-[#f0f4f2] dark:hover:bg-[#102216] transition-colors">
          <span className="material-symbols-outlined text-xl">settings</span>
          <span>Settings</span>
        </button>
        <button type="button" className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#111813] dark:text-white hover:bg-[#f0f4f2] dark:hover:bg-[#102216] transition-colors">
          <span className="material-symbols-outlined text-xl">credit_card</span>
          <span>Billing</span>
        </button>
        <div className="border-t border-[#dbe6df] dark:border-[#2a3a2e] my-1"></div>
        <button type="button" className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-[#f0f4f2] dark:hover:bg-[#102216] transition-colors">
          <span className="material-symbols-outlined text-xl">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default ProfileDropdown