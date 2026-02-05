import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { handleInputChange, handleSubmit } from './helpers'
import SidebarHeader from './subcomponents/SidebarHeader'
import AmountInput from './subcomponents/AmountInput'
import DateInput from './subcomponents/DateInput'
import CategorySelect from './subcomponents/CategorySelect'
import DescriptionTextarea from './subcomponents/DescriptionTextarea'
import FormActions from './subcomponents/FormActions'

const AddExpenseSidebar = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    category: '',
    description: ''
  })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

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
    handleSubmit(e, formData, setFormData, onClose)
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
          <SidebarHeader title="Add Expense" onClose={onClose} />

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

            <FormActions onCancel={onClose} />
          </form>
        </div>
      </div>
    </>
  )
}

AddExpenseSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default AddExpenseSidebar