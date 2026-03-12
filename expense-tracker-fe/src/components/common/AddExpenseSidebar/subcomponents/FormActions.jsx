import React from 'react'

const FormActions = ({ onCancel, submitLabel = "Add Expense", cancelLabel = "Cancel", isLoading = false }) => {
  return (
    <div className="fixed bottom-0 w-full flex gap-3 pt-4 border-t border-[#dbe6df] dark:border-[#2a3a2e] bg-white dark:bg-[#102216] pb-6 -mx-6 px-6">
      <button
        type="button"
        onClick={onCancel}
        disabled={isLoading}
        className="cursor-pointer flex-1 px-4 py-3 text-sm font-medium rounded-lg text-[#61896f] hover:bg-[#f0f4f2] dark:hover:bg-[#1a2e1e] transition-colors border border-[#dbe6df] dark:border-[#2a3a2e] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {cancelLabel}
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className="cursor-pointer flex-1 px-4 py-3 text-sm font-bold rounded-lg bg-primary text-black hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </>
        ) : (
          submitLabel
        )}
      </button>
    </div>
  )
}

export default FormActions

