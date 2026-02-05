import React from 'react'
import PropTypes from 'prop-types'

const FormActions = ({ onCancel, submitLabel = "Add Expense", cancelLabel = "Cancel" }) => {
  return (
    <div className="fixed bottom-0 w-full flex gap-3 pt-4 border-t border-[#dbe6df] dark:border-[#2a3a2e] bg-white dark:bg-[#102216] pb-6 -mx-6 px-6">
      <button
        type="button"
        onClick={onCancel}
        className="cursor-pointer flex-1 px-4 py-3 text-sm font-medium rounded-lg text-[#61896f] hover:bg-[#f0f4f2] dark:hover:bg-[#1a2e1e] transition-colors border border-[#dbe6df] dark:border-[#2a3a2e]"
      >
        {cancelLabel}
      </button>
      <button
        type="submit"
        className="cursor-pointer flex-1 px-4 py-3 text-sm font-bold rounded-lg bg-primary text-black hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
      >
        {submitLabel}
      </button>
    </div>
  )
}

FormActions.propTypes = {
  onCancel: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string
}

export default FormActions

