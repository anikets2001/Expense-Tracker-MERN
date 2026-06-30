import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../../redux/slices/authSlice'

const ProfileDropdown = ({ isOpen, firstName = "John", lastName="Doe", email = "johndoe@gmail.com" }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-56 bg-white dark:bg-[#1a2e1e] rounded-lg shadow-lg border border-[#dbe6df] dark:border-[#2a3a2e] overflow-hidden z-50 max-w-[calc(100vw-2rem)]">
      <div className="px-4 py-3 border-b border-[#dbe6df] dark:border-[#2a3a2e]">
        <p className="text-sm font-bold text-[#111813] dark:text-white">{firstName} {lastName}</p>
        <p className="text-xs text-[#61896f] font-medium mt-0.5">{email}</p>
        {/* {userRole && <p className="text-xs text-[#61896f] font-medium mt-0.5">{userRole}</p>} */}
      </div>
      <div className="py-1">
        <button type="button" onClick={() => navigate('/profile')} className="cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#111813] dark:text-white hover:bg-[#f0f4f2] dark:hover:bg-[#102216] transition-colors">
          <span className="material-symbols-outlined text-xl">person</span>
          <span>Profile</span>
        </button>
        <button type="button" onClick={() => navigate('/settings')} className="cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#111813] dark:text-white hover:bg-[#f0f4f2] dark:hover:bg-[#102216] transition-colors">
          <span className="material-symbols-outlined text-xl">settings</span>
          <span>Settings</span>
        </button>
        <div className="border-t border-[#dbe6df] dark:border-[#2a3a2e] my-1"></div>
        <button type="button" onClick={handleLogout} className="cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-[#f0f4f2] dark:hover:bg-[#102216] transition-colors">
          <span className="material-symbols-outlined text-xl">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default ProfileDropdown