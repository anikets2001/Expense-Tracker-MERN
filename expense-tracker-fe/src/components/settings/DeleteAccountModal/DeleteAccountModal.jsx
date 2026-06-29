import React, { useState } from 'react'

const CONFIRM_PHRASE = 'Delete my account'

// NOTE: Confirmation-gate UI only — typing the phrase enables the button,
// but no API call/account deletion is wired up yet.
const DeleteAccountModal = ({ isOpen, onClose }) => {
  const [confirmText, setConfirmText] = useState('')

  if (!isOpen) return null

  const isConfirmed = confirmText === CONFIRM_PHRASE

  const handleClose = () => {
    setConfirmText('')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 transition-opacity animate-in fade-in duration-300"
      onClick={handleClose}
    >
      <div
        className="bg-white dark:bg-[#102216] rounded-xl shadow-2xl border border-red-200 dark:border-red-900/40 w-full max-w-md max-h-[90vh] overflow-y-auto z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-red-200 dark:border-red-900/40">
          <div>
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
              <span className="material-symbols-outlined">warning</span>
              Delete Account
            </h2>
            <p className="text-sm text-[#61896f] mt-1">
              This action is permanent and cannot be undone.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer p-2 hover:bg-[#f0f4f2] dark:hover:bg-[#1a2e1e] rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[#111813] dark:text-white">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <ul className="text-sm text-[#61896f] space-y-1.5 list-disc pl-5">
            <li>All your transactions and expense history will be permanently deleted.</li>
            <li>Your profile and account settings will be permanently deleted.</li>
            <li>You will be signed out immediately and cannot recover this account.</li>
          </ul>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#111813] dark:text-white">
              Type <span className="text-red-500">&quot;{CONFIRM_PHRASE}&quot;</span> to confirm
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={CONFIRM_PHRASE}
              className="w-full px-4 py-3 bg-[#f0f4f2] dark:bg-[#1a2e1e] border border-[#dbe6df] dark:border-[#2a3a2e] rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-[#111813] dark:text-white placeholder:text-[#61896f]/60"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-red-200 dark:border-red-900/40">
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer px-4 py-2.5 text-sm font-medium rounded-lg text-[#61896f] hover:bg-[#f0f4f2] dark:hover:bg-[#1a2e1e] transition-colors border border-[#dbe6df] dark:border-[#2a3a2e]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!isConfirmed}
            className="cursor-pointer px-5 py-2.5 text-sm font-bold rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-500"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccountModal
