import React, { useState, useRef } from 'react'
import useClickAwayListener from '../../../hooks/useClickAwayListener'
import { notifications } from './config'
import { toggleDropdown, toggleNotifications, getUnreadCount } from './helpers'
import NotificationsDropdown from './subcomponents/NotificationsDropdown'
import ProfileDropdown from './subcomponents/ProfileDropdown'

const Topbar = ({title, onMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const notificationsRef = useRef(null)

  useClickAwayListener(dropdownRef, () => setIsDropdownOpen(false), isDropdownOpen)
  useClickAwayListener(notificationsRef, () => setIsNotificationsOpen(false), isNotificationsOpen)

  const onToggleDropdown = () => {
    toggleDropdown(isDropdownOpen, setIsDropdownOpen)
  }

  const onToggleNotifications = () => {
    toggleNotifications(isNotificationsOpen, setIsNotificationsOpen)
  }

  const unreadCount = getUnreadCount(notifications)

  return (
    <header className="flex items-center justify-between bg-white dark:bg-black border-b border-[#dbe6df] dark:border-[#2a3a2e] px-4 md:px-8 py-4 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-[#f0f4f2] dark:hover:bg-[#1a2e1e] rounded-lg transition-colors mr-2"
        >
          <span className="material-symbols-outlined text-[#111813] dark:text-white">menu</span>
        </button>
        <h2 className="text-[#111813] dark:text-white text-lg md:text-xl font-bold">{title}</h2>
      </div>
      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-3 dark:border-[#2a3a2e]">
          {/* <div className="relative" ref={notificationsRef}>
            <button 
              onClick={onToggleNotifications}
              className="cursor-pointer p-2 bg-[#f0f4f2] dark:bg-[#1a2e1e] rounded-lg text-[#111813] dark:text-white relative hover:bg-[#dbe6df] dark:hover:bg-[#2a3a2e] transition-colors"
            >
              <span className="material-symbols-outlined">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-black"></span>
              )}
            </button>
            <NotificationsDropdown
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
            />
          </div> */}
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={onToggleDropdown}
            >
              <div
                className="w-9 h-9 rounded-full bg-cover bg-center border border-[#dbe6df] dark:border-[#2a3a2e]"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuASHWCSK7mnKyze-PeDjTU6N5RiceabLNwXX8TM4mYUkwwZBAcoYmrRupfbqzwpYfEZrWIfO-Xc-310m-6OyMl4Vwq9jb4hJJ7_0ABa5wgIfK3opJ2NghI9xg7-I1Qwlr28I3OkxtyLn41vF7Jwf2fEe1rVb7zs_4mLvH6l8I5EfypswI1NxG0ECqZpYKVu3DorSoy7b9RqjCZN9YzkbVGv22E8RTMddArE8O8t7Y8OoI4IAQxFL3TkwVS7FalZttadbPnHccZzhp4')"
                }}
              ></div>
              <div className="hidden md:block">
                <p className="text-sm font-bold text-[#111813] dark:text-white leading-none">Alex Rivera</p>
                <p className="text-xs text-[#61896f] font-medium mt-1">Premium Member</p>
              </div>
              <span className="material-symbols-outlined text-[#61896f] text-xl">
                {isDropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            </div>
            <ProfileDropdown isOpen={isDropdownOpen} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
