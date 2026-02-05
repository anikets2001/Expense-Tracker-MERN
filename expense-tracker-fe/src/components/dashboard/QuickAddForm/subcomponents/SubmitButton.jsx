import React from 'react'
import PropTypes from 'prop-types'

const SubmitButton = ({ label = "Add Expense", className = "" }) => {
  return (
    <div className={`md:col-span-2 pt-2 ${className}`}>
      <button
        className="cursor-pointer w-full bg-primary text-black py-4 rounded-xl font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
        type="button"
      >
        {label}
      </button>
    </div>
  )
}

SubmitButton.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string
}

export default SubmitButton