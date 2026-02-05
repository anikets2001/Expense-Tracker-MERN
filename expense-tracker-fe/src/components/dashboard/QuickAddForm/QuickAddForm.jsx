import React, { useState } from 'react'
import { handleDateChange, handleInputClick } from './helpers'
import FormHeader from './subcomponents/FormHeader'
import FormField from './subcomponents/FormField'
import SubmitButton from './subcomponents/SubmitButton'

const QuickAddForm = () => {
  const [date, setDate] = useState('')
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const onDateChange = (newDate) => {
    handleDateChange(newDate, setDate)
  }

  const onInputClick = () => {
    handleInputClick(setIsCalendarOpen)
  }

  const categories = ['Food & Drinks', 'Transport', 'Housing', 'Entertainment', 'Shopping']

  return (
    <section className="bg-white dark:bg-black rounded-xl border border-[#dbe6df] dark:border-[#2a3a2e] shadow-sm">
      <FormHeader title="Quick Add Expense" />
      <div className="p-4 md:p-6">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <FormField
            type="number"
            label="Amount (₹)"
            value=""
            onChange={() => {}}
            placeholder="0.00"
          />
          <FormField
            type="date"
            label="Date"
            value={date}
            onChange={onDateChange}
            placeholder="mm/dd/yyyy"
            isCalendarOpen={isCalendarOpen}
            onCalendarToggle={onInputClick}
          />
          <FormField
            type="select"
            label="Category"
            value=""
            onChange={() => {}}
            options={categories}
          />
          <FormField
            type="text"
            label="Description"
            value=""
            onChange={() => {}}
            placeholder="What did you buy?"
          />
          <SubmitButton />
        </form>
      </div>
    </section>
  );
};

export default QuickAddForm;