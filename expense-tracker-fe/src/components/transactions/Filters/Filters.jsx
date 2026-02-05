import React, { useState, useRef } from 'react'
import DateRangePicker from '../../common/DateRangePicker/DateRangePicker'
import useClickAwayListener from '../../../hooks/useClickAwayListener'
import { formatDate, toggleCategory, clearFilter, clearAllFilters } from './helpers'
import SearchBar from './subcomponents/SearchBar'
import FilterButton from './subcomponents/FilterButton'
import CategoriesModal from './subcomponents/CategoriesModal'
import AmountModal from './subcomponents/AmountModal'
import AppliedFilters from './subcomponents/AppliedFilters'

const Filters = () => {
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isAmountOpen, setIsAmountOpen] = useState(false)
  
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [minAmount, setMinAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')

  const dateRangeRef = useRef(null)
  const categoriesRef = useRef(null)
  const amountRef = useRef(null)

  useClickAwayListener(dateRangeRef, () => setIsDateRangeOpen(false), isDateRangeOpen)
  useClickAwayListener(categoriesRef, () => setIsCategoriesOpen(false), isCategoriesOpen)
  useClickAwayListener(amountRef, () => setIsAmountOpen(false), isAmountOpen)

  const onToggleCategory = (category) => {
    toggleCategory(category, setSelectedCategories)
  }

  const appliedFilters = []
  if (startDate && endDate) {
    appliedFilters.push({ type: 'date', label: `${formatDate(startDate)} - ${formatDate(endDate)}` })
  }
  if (selectedCategories.length > 0) {
    appliedFilters.push({ type: 'categories', label: selectedCategories.join(', ') })
  }
  if (minAmount || maxAmount) {
    const amountLabel = minAmount && maxAmount 
      ? `₹${minAmount} - ₹${maxAmount}`
      : minAmount 
      ? `₹${minAmount}+`
      : `Up to ₹${maxAmount}`
    appliedFilters.push({ type: 'amount', label: amountLabel })
  }

  const onClearFilter = (type) => {
    clearFilter(type, setStartDate, setEndDate, setSelectedCategories, setMinAmount, setMaxAmount)
  }

  const onClearAllFilters = () => {
    clearAllFilters(setStartDate, setEndDate, setSelectedCategories, setMinAmount, setMaxAmount)
  }

  return (
    <div className="bg-white dark:bg-[#102216] border border-[#dbe6df] dark:border-white/10 rounded-xl p-3 md:p-4 flex flex-col gap-3 md:gap-4">
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        <SearchBar />
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          <div className="relative" ref={dateRangeRef}>
            <FilterButton
              icon="calendar_month"
              label="Date Range"
              isOpen={isDateRangeOpen}
              isActive={startDate && endDate}
              onClick={() => {
                setIsDateRangeOpen(!isDateRangeOpen)
                setIsCategoriesOpen(false)
                setIsAmountOpen(false)
              }}
            />
            {isDateRangeOpen && (
              <div className="absolute top-full right-0 mt-2 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-[calc(100vw-2rem)]">
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={setStartDate}
                  onEndDateChange={setEndDate}
                  onClose={() => setIsDateRangeOpen(false)}
                />
              </div>
            )}
          </div>

          <div className="relative" ref={categoriesRef}>
            <FilterButton
              icon="category"
              label="Categories"
              isOpen={isCategoriesOpen}
              isActive={selectedCategories.length > 0}
              onClick={() => {
                setIsCategoriesOpen(!isCategoriesOpen)
                setIsDateRangeOpen(false)
                setIsAmountOpen(false)
              }}
            />
            <CategoriesModal
              isOpen={isCategoriesOpen}
              selectedCategories={selectedCategories}
              onToggleCategory={onToggleCategory}
              onClose={() => setIsCategoriesOpen(false)}
            />
          </div>

          <div className="relative" ref={amountRef}>
            <FilterButton
              icon="payments"
              label="Amount"
              isOpen={isAmountOpen}
              isActive={minAmount || maxAmount}
              onClick={() => {
                setIsAmountOpen(!isAmountOpen)
                setIsDateRangeOpen(false)
                setIsCategoriesOpen(false)
              }}
            />
            <AmountModal
              isOpen={isAmountOpen}
              minAmount={minAmount}
              maxAmount={maxAmount}
              onMinAmountChange={setMinAmount}
              onMaxAmountChange={setMaxAmount}
              onClose={() => setIsAmountOpen(false)}
            />
          </div>
        </div>
      </div>
      <AppliedFilters
        filters={appliedFilters}
        onClearFilter={onClearFilter}
        onClearAll={onClearAllFilters}
      />
    </div>
  )
}

export default Filters