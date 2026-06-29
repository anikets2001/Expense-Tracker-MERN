import React, { useState } from 'react'
import Sidebar from '../../components/layout/Sidebar/Sidebar'
import Topbar from '../../components/layout/Topbar/Topbar'
import DeleteAccountModal from '../../components/settings/DeleteAccountModal/DeleteAccountModal'

// NOTE: Design-only pass — all values below are static placeholders.
// No data fetching, form state, or submit/export/delete handlers wired up yet.

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [theme, setTheme] = useState('light') // 'light' | 'dark' | 'system' — UI state only, not persisted
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const user = {
    isGoogleLinked: false, // toggle to preview the Google-linked password card
  }

  const baseInputClasses =
    'w-full px-4 py-3 bg-[#f0f4f2] dark:bg-[#1a2e1e] border border-[#dbe6df] dark:border-[#2a3a2e] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-[#111813] dark:text-white placeholder:text-[#61896f]'

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark">
        <Topbar title={'Settings'} onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="p-4 md:p-6 lg:p-8 mx-auto w-full max-w-4xl space-y-6 md:space-y-8">
          {/* Change Password */}
          <section className="bg-white dark:bg-black rounded-xl border border-[#dbe6df] dark:border-[#2a3a2e] shadow-sm">
            <div className="p-4 md:p-6 border-b border-[#dbe6df] dark:border-[#2a3a2e]">
              <h3 className="text-base md:text-lg font-bold text-[#111813] dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">lock</span>
                Change Password
              </h3>
            </div>

            <div className="p-4 md:p-6">
              {user.isGoogleLinked ? (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-[#f0f4f2] dark:bg-[#1a2e1e]">
                  <span className="material-symbols-outlined text-blue-500 bg-blue-500/10 p-2 rounded-lg">
                    info
                  </span>
                  <p className="text-sm text-[#61896f]">
                    Your account is linked with Google, so it doesn&apos;t have a password to
                    change here.
                  </p>
                </div>
              ) : (
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-sm font-bold text-[#111813] dark:text-white">
                      Current Password
                    </label>
                    <input type="password" placeholder="••••••••" className={baseInputClasses} />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#111813] dark:text-white">
                      New Password
                    </label>
                    <input type="password" placeholder="••••••••" className={baseInputClasses} />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#111813] dark:text-white">
                      Confirm New Password
                    </label>
                    <input type="password" placeholder="••••••••" className={baseInputClasses} />
                  </div>

                  <div className="md:col-span-2 pt-2">
                    <button
                      type="submit"
                      className="cursor-pointer w-full md:w-auto md:px-8 bg-primary text-black py-3 rounded-xl font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>

          {/* Currency & Locale */}
          <section className="bg-white dark:bg-black rounded-xl border border-[#dbe6df] dark:border-[#2a3a2e] shadow-sm">
            <div className="p-4 md:p-6 border-b border-[#dbe6df] dark:border-[#2a3a2e]">
              <h3 className="text-base md:text-lg font-bold text-[#111813] dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">payments</span>
                Currency &amp; Locale
              </h3>
            </div>

            <div className="p-4 md:p-6">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#111813] dark:text-white">
                    Currency
                  </label>
                  <select defaultValue="INR" className={`${baseInputClasses} pr-10 appearance-none cursor-pointer`}>
                    <option value="INR">₹ Indian Rupee (INR)</option>
                    <option value="USD">$ US Dollar (USD)</option>
                    <option value="EUR">€ Euro (EUR)</option>
                    <option value="GBP">£ British Pound (GBP)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#111813] dark:text-white">
                    Date Format
                  </label>
                  <select defaultValue="dd-mm-yyyy" className={`${baseInputClasses} pr-10 appearance-none cursor-pointer`}>
                    <option value="dd-mm-yyyy">DD/MM/YYYY</option>
                    <option value="mm-dd-yyyy">MM/DD/YYYY</option>
                    <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="cursor-pointer w-full md:w-auto md:px-8 bg-primary text-black py-3 rounded-xl font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                  >
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Appearance */}
          <section className="bg-white dark:bg-black rounded-xl border border-[#dbe6df] dark:border-[#2a3a2e] shadow-sm">
            <div className="p-4 md:p-6 border-b border-[#dbe6df] dark:border-[#2a3a2e]">
              <h3 className="text-base md:text-lg font-bold text-[#111813] dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">dark_mode</span>
                Appearance
              </h3>
            </div>

            <div className="p-4 md:p-6">
              <p className="text-sm font-bold text-[#111813] dark:text-white mb-3">Theme</p>
              <div className="inline-flex bg-[#f0f4f2] dark:bg-[#1a2e1e] rounded-lg p-1 gap-1">
                {[
                  { key: 'light', label: 'Light', icon: 'light_mode' },
                  { key: 'dark', label: 'Dark', icon: 'dark_mode' },
                  { key: 'system', label: 'System', icon: 'computer' },
                ].map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setTheme(option.key)}
                    className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                      theme === option.key
                        ? 'bg-primary text-black shadow-sm'
                        : 'text-[#61896f] hover:text-[#111813] dark:hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">{option.icon}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Data Export */}
          <section className="bg-white dark:bg-black rounded-xl border border-[#dbe6df] dark:border-[#2a3a2e] shadow-sm">
            <div className="p-4 md:p-6 border-b border-[#dbe6df] dark:border-[#2a3a2e]">
              <h3 className="text-base md:text-lg font-bold text-[#111813] dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">download</span>
                Export Data
              </h3>
            </div>

            <div className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-[#61896f] max-w-md">
                Download all your transactions as a CSV file for your records or use in another
                app.
              </p>
              <button
                type="button"
                className="cursor-pointer shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-[#dbe6df] dark:border-[#2a3a2e] text-sm font-bold text-[#111813] dark:text-white hover:bg-[#f0f4f2] dark:hover:bg-[#1a2e1e] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">download</span>
                Export as CSV
              </button>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="bg-white dark:bg-black rounded-xl border border-red-200 dark:border-red-900/40 shadow-sm">
            <div className="p-4 md:p-6 border-b border-red-200 dark:border-red-900/40">
              <h3 className="text-base md:text-lg font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                <span className="material-symbols-outlined">warning</span>
                Danger Zone
              </h3>
            </div>

            <div className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#111813] dark:text-white">Delete Account</p>
                <p className="text-sm text-[#61896f] max-w-md mt-1">
                  Permanently delete your account and all associated transactions. This action
                  cannot be undone.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                className="cursor-pointer shrink-0 px-5 py-2.5 rounded-lg bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </section>
        </div>
      </main>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  )
}

export default Settings
