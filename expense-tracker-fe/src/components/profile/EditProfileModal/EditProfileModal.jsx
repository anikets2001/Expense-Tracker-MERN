import React, { useEffect, useState } from 'react'
import { useUpdateMeMutation } from '../../../redux/services/authApi'

const EditProfileModal = ({ isOpen, onClose, user }) => {
  const [updateMe, { isLoading, error }] = useUpdateMeMutation()
  const [formData, setFormData] = useState({ firstName: '', lastName: '' })

  // Reset the form to the latest user data each time the modal opens.
  useEffect(() => {
    if (isOpen) {
      setFormData({ firstName: user.firstName, lastName: user.lastName })
    }
  }, [isOpen, user])

  if (!isOpen) return null

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateMe(formData).unwrap()
      onClose()
    } catch {
      // error is surfaced below via the mutation's `error` state
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 transition-opacity animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#102216] rounded-xl shadow-2xl border border-[#dbe6df] dark:border-[#2a3a2e] w-full max-w-md max-h-[90vh] overflow-y-auto z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#dbe6df] dark:border-[#2a3a2e]">
          <div>
            <h2 className="text-xl font-bold text-[#111813] dark:text-white">Edit Profile</h2>
            <p className="text-sm text-[#61896f] mt-1">Update your account details below.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer p-2 hover:bg-[#f0f4f2] dark:hover:bg-[#1a2e1e] rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[#111813] dark:text-white">close</span>
          </button>
        </div>

        {/* Body */}
        <form id="edit-profile-form" onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <p className="text-sm font-medium text-red-500 bg-red-500/10 rounded-lg px-3 py-2">
              {error?.data?.message || 'Failed to update profile. Please try again.'}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#111813] dark:text-white">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isLoading}
                required
                className="w-full px-4 py-3 bg-[#f0f4f2] dark:bg-[#1a2e1e] border border-[#dbe6df] dark:border-[#2a3a2e] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-[#111813] dark:text-white disabled:opacity-60"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#111813] dark:text-white">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isLoading}
                required
                className="w-full px-4 py-3 bg-[#f0f4f2] dark:bg-[#1a2e1e] border border-[#dbe6df] dark:border-[#2a3a2e] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-[#111813] dark:text-white disabled:opacity-60"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#111813] dark:text-white">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#61896f] text-lg">
                mail
              </span>
              <input
                type="email"
                defaultValue={user.email}
                readOnly
                className="cursor-not-allowed w-full pl-10 pr-4 py-3 bg-[#f0f4f2] dark:bg-[#1a2e1e] border border-[#dbe6df] dark:border-[#2a3a2e] rounded-lg text-[#111813] dark:text-white"
              />
            </div>
          </div>

          {/* Profile Picture — design-only placeholder, not wired to any upload logic */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#111813] dark:text-white">Profile Picture</label>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-lg font-extrabold text-primary">{user.initials}</span>
              </div>
              <button
                type="button"
                className="cursor-pointer px-4 py-2 text-sm font-semibold rounded-lg border border-[#dbe6df] dark:border-[#2a3a2e] text-[#111813] dark:text-white hover:bg-[#f0f4f2] dark:hover:bg-[#1a2e1e] transition-colors"
              >
                Change Photo
              </button>
              <button
                type="button"
                className="cursor-pointer text-sm font-semibold text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#dbe6df] dark:border-[#2a3a2e]">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="cursor-pointer px-4 py-2.5 text-sm font-medium rounded-lg text-[#61896f] hover:bg-[#f0f4f2] dark:hover:bg-[#1a2e1e] transition-colors border border-[#dbe6df] dark:border-[#2a3a2e] disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-profile-form"
            disabled={isLoading}
            className="cursor-pointer px-5 py-2.5 text-sm font-bold rounded-lg bg-primary text-black hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-lg">check</span>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfileModal
