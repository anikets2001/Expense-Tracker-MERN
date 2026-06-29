import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/layout/Sidebar/Sidebar'
import Topbar from '../../components/layout/Topbar/Topbar'
import EditProfileModal from '../../components/profile/EditProfileModal/EditProfileModal'

// NOTE: Design-only pass — all values below are static placeholders.
// No data fetching, form state, or submit handlers wired up yet.

const Profile = () => {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Placeholder data — will be replaced by real user state later
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    initials: 'JD',
    isGoogleLinked: false, // toggle to preview the Google-linked badge variant
    memberSince: 'Jan 2025',
    totalTransactions: 128,
    totalExpenses: '₹45,230.00',
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark">
        <Topbar title={'Profile'} onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="p-4 md:p-6 lg:p-8 mx-auto w-full space-y-6 md:space-y-8">
          {/* Hero profile section */}
          <section className="relative">
            <div className="absolute inset-x-0 -top-4 h-40 md:h-52 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent -z-10" />

            <div className="flex flex-col sm:flex-row sm:items-end gap-6 pt-8 sm:pt-10 px-2 sm:px-4">
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-primary/10 border-4 border-white dark:border-background-dark shadow-lg flex items-center justify-center shrink-0">
                <span className="text-3xl md:text-4xl font-extrabold text-primary">
                  {user.initials}
                </span>
              </div>

              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#111813] dark:text-white">
                    {user.firstName} {user.lastName}
                  </h2>

                  {/* Account type indicator */}
                  {user.isGoogleLinked ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      Google Account
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                      <span className="material-symbols-outlined text-sm">mail</span>
                      Email &amp; Password
                    </span>
                  )}
                </div>

                <p className="text-[#61896f] font-medium mb-4">{user.email}</p>

                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(true)}
                  className="cursor-pointer px-6 py-2.5 bg-primary text-black rounded-lg font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                  Edit Profile
                </button>
              </div>
            </div>
          </section>

          {/* Account summary stats — bento style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white dark:bg-black p-4 md:p-6 rounded-xl shadow-sm border border-[#dbe6df] dark:border-[#2a3a2e] border-l-4 border-l-primary flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#61896f] uppercase tracking-wider">
                  Member Since
                </p>
                <p className="text-xl md:text-2xl font-extrabold text-[#111813] dark:text-white">
                  {user.memberSince}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-black p-4 md:p-6 rounded-xl shadow-sm border border-[#dbe6df] dark:border-[#2a3a2e] border-l-4 border-l-blue-500 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                <span className="material-symbols-outlined">account_balance_wallet</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#61896f] uppercase tracking-wider">
                  Total Transactions
                </p>
                <p className="text-xl md:text-2xl font-extrabold text-[#111813] dark:text-white">
                  {user.totalTransactions}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-black p-4 md:p-6 rounded-xl shadow-sm border border-[#dbe6df] dark:border-[#2a3a2e] border-l-4 border-l-red-500 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                <span className="material-symbols-outlined">trending_down</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#61896f] uppercase tracking-wider">
                  Total Expenses Logged
                </p>
                <p className="text-xl md:text-2xl font-extrabold text-[#111813] dark:text-white">
                  {user.totalExpenses}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Basic information — read-only display, edited via the modal above */}
            <section className="lg:col-span-8 bg-white dark:bg-black rounded-xl border border-[#dbe6df] dark:border-[#2a3a2e] shadow-sm p-4 md:p-6">
              <h3 className="text-base md:text-lg font-bold text-[#111813] dark:text-white mb-4 md:mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-[#61896f] uppercase tracking-wider">
                    First Name
                  </p>
                  <p className="text-base font-semibold text-[#111813] dark:text-white border-b border-[#dbe6df] dark:border-[#2a3a2e] pb-2">
                    {user.firstName}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-[#61896f] uppercase tracking-wider">
                    Last Name
                  </p>
                  <p className="text-base font-semibold text-[#111813] dark:text-white border-b border-[#dbe6df] dark:border-[#2a3a2e] pb-2">
                    {user.lastName}
                  </p>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <p className="text-xs font-semibold text-[#61896f] uppercase tracking-wider">
                    Email Address
                  </p>
                  <div className="flex items-center justify-between border-b border-[#dbe6df] dark:border-[#2a3a2e] pb-2">
                    <p className="text-base font-semibold text-[#111813] dark:text-white">
                      {user.email}
                    </p>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded">
                      Primary
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Account quick links — shortcuts into the upcoming Settings page */}
            <section className="lg:col-span-4 bg-white dark:bg-black rounded-xl border border-[#dbe6df] dark:border-[#2a3a2e] shadow-sm p-4 md:p-6">
              <h3 className="text-base md:text-lg font-bold text-[#111813] dark:text-white mb-4 md:mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">settings</span>
                Account Settings
              </h3>

              <div className="flex flex-col -mx-2">
                <button
                  type="button"
                  onClick={() => navigate('/settings')}
                  className="cursor-pointer flex items-center justify-between gap-3 px-2 py-3 rounded-lg hover:bg-[#f0f4f2] dark:hover:bg-[#1a2e1e] transition-colors text-left"
                >
                  <span className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#61896f]">lock</span>
                    <span className="text-sm font-semibold text-[#111813] dark:text-white">
                      Change Password
                    </span>
                  </span>
                  <span className="material-symbols-outlined text-[#61896f]">chevron_right</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/settings')}
                  className="cursor-pointer flex items-center justify-between gap-3 px-2 py-3 rounded-lg hover:bg-[#f0f4f2] dark:hover:bg-[#1a2e1e] transition-colors text-left"
                >
                  <span className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#61896f]">payments</span>
                    <span className="text-sm font-semibold text-[#111813] dark:text-white">
                      Currency &amp; Locale
                    </span>
                  </span>
                  <span className="material-symbols-outlined text-[#61896f]">chevron_right</span>
                </button>

                <div className="border-t border-[#dbe6df] dark:border-[#2a3a2e] my-1" />

                <button
                  type="button"
                  onClick={() => navigate('/settings')}
                  className="cursor-pointer flex items-center justify-between gap-3 px-2 py-3 rounded-lg hover:bg-[#f0f4f2] dark:hover:bg-[#1a2e1e] transition-colors text-left"
                >
                  <span className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#61896f]">tune</span>
                    <span className="text-sm font-semibold text-[#111813] dark:text-white">
                      Manage Account
                    </span>
                  </span>
                  <span className="material-symbols-outlined text-[#61896f]">chevron_right</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />
    </div>
  )
}

export default Profile
