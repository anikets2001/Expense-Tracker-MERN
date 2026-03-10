import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { handleInputChange, handleSubmit, formatDateForInput, categories } from './helpers'
import SidebarHeader from '../AddExpenseSidebar/subcomponents/SidebarHeader'
import AmountInput from '../AddExpenseSidebar/subcomponents/AmountInput'
import DateInput from '../AddExpenseSidebar/subcomponents/DateInput'
import CategorySelect from '../AddExpenseSidebar/subcomponents/CategorySelect'
import DescriptionTextarea from '../AddExpenseSidebar/subcomponents/DescriptionTextarea'
import FormActions from '../AddExpenseSidebar/subcomponents/FormActions'

const EditExpenseSidebar = ({ isOpen, onClose, expense, onSuccess }) => {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    category: '',
    description: ''
  })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Populate form when expense data is available
  useEffect(() => {
    if (expense && isOpen) {
      setFormData({
        amount: expense.amount || '',
        date: formatDateForInput(expense.date) || '',
        category: expense.category || '',
        description: expense.description || ''
      })
      setError(null)
    }
  }, [expense, isOpen])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY
      // Disable body scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      return () => {
        // Restore scroll position when sidebar closes
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  const onInputChange = (field, value) => {
    handleInputChange(field, value, setFormData)
  }

  const onSubmit = (e) => {
    if (expense && expense._id) {
      handleSubmit(e, expense._id, formData, setFormData, onClose, setIsLoading, setError, onSuccess)
    }
  }

  if (!expense) {
    return null
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full sm:max-w-md bg-white dark:bg-[#102216] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <SidebarHeader title="Edit Expense" onClose={onClose} />

          <form onSubmit={onSubmit} className="flex-1 p-6 space-y-6">
            <AmountInput
              value={formData.amount}
              onChange={(value) => onInputChange('amount', value)}
              required
            />

            <DateInput
              value={formData.date}
              onChange={(date) => {
                onInputChange('date', date)
                setIsCalendarOpen(false)
              }}
              isCalendarOpen={isCalendarOpen}
              onCalendarToggle={() => setIsCalendarOpen(!isCalendarOpen)}
              required
            />

            <CategorySelect
              value={formData.category}
              onChange={(value) => onInputChange('category', value)}
              required
            />

            <DescriptionTextarea
              value={formData.description}
              onChange={(value) => onInputChange('description', value)}
            />

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <FormActions 
              onCancel={onClose} 
              isLoading={isLoading}
              submitLabel="Update Expense"
            />
          </form>
        </div>
      </div>
    </>
  )
}

EditExpenseSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  expense: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    amount: PropTypes.number,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    category: PropTypes.string,
    description: PropTypes.string
  }),
  onSuccess: PropTypes.func
}

export default EditExpenseSidebar
