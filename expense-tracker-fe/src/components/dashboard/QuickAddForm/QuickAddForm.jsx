import React, { useState } from 'react'
import { useCreateExpenseMutation } from '../../../redux/services/expensesApis'
import { handleDateChange, handleInputClick, handleSubmit } from './helpers'
import FormHeader from './subcomponents/FormHeader'
import FormField from './subcomponents/FormField'
import SubmitButton from './subcomponents/SubmitButton'

const QuickAddForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    category: '',
    description: ''
  })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [error, setError] = useState(null)
  
  // RTK Query mutation
  const [createExpense, { isLoading }] = useCreateExpenseMutation()

  const onDateChange = (newDate) => {
    handleDateChange(newDate, (date) => {
      setFormData(prev => ({ ...prev, date }))
      setIsCalendarOpen(false) // Close calendar when date is selected
    })
  }

  const onInputClick = () => {
    handleInputClick(setIsCalendarOpen)
  }

  const onInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  const onSubmit = async (e) => {
    await handleSubmit(e, formData, setFormData, setError, onSuccess, createExpense)
  }

  const categories = ['Food & Drinks', 'Transport', 'Housing', 'Entertainment', 'Shopping', 'Utilities', 'Healthcare', 'Education', 'Travel', 'Other']

  return (
    <section className="bg-white dark:bg-black rounded-xl border border-[#dbe6df] dark:border-[#2a3a2e] shadow-sm">
      <FormHeader title="Quick Add Expense" />
      <div className="p-4 md:p-6">
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <FormField
            type="number"
            label="Amount (₹)"
            value={formData.amount}
            onChange={(value) => onInputChange('amount', value)}
            placeholder="0.00"
            required
          />
          <FormField
            type="date"
            label="Date"
            value={formData.date}
            onChange={onDateChange}
            placeholder="mm/dd/yyyy"
            isCalendarOpen={isCalendarOpen}
            onCalendarToggle={onInputClick}
            onCalendarClose={() => setIsCalendarOpen(false)}
            required
          />
          <FormField
            type="select"
            label="Category"
            value={formData.category}
            onChange={(value) => onInputChange('category', value)}
            options={categories}
            required
          />
          <FormField
            type="text"
            label="Description"
            value={formData.description}
            onChange={(value) => onInputChange('description', value)}
            placeholder="What did you buy?"
          />
          
          {/* Error Message */}
          {error && (
            <div className="md:col-span-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <SubmitButton isLoading={isLoading} className="md:col-span-2" />
        </form>
      </div>
    </section>
  );
};

export default QuickAddForm;