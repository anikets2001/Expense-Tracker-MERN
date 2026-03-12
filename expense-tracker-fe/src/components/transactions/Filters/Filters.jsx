import React, { useState, useRef } from 'react'
import DateRangePicker from '../../common/DateRangePicker/DateRangePicker'
import useClickAwayListener from '../../../hooks/useClickAwayListener'
import { formatDate, toggleCategory, clearFilter, clearAllFilters } from './helpers'
import SearchBar from './subcomponents/SearchBar'
import FilterButton from './subcomponents/FilterButton'
import CategoriesModal from './subcomponents/CategoriesModal'
import AmountModal from './subcomponents/AmountModal'
import AppliedFilters from './subcomponents/AppliedFilters'

const Filters = ({
  search = '',
  onSearchChange,
  startDate = '',
  onStartDateChange,
  endDate = '',
  onEndDateChange,
  selectedCategories = [],
  onCategoriesChange,
  minAmount = '',
  onMinAmountChange,
  maxAmount = '',
  onMaxAmountChange,
  onFiltersChange
}) => {
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isAmountOpen, setIsAmountOpen] = useState(false)

  const dateRangeRef = useRef(null)
  const categoriesRef = useRef(null)
  const amountRef = useRef(null)

  useClickAwayListener(dateRangeRef, () => setIsDateRangeOpen(false), isDateRangeOpen)
  useClickAwayListener(categoriesRef, () => setIsCategoriesOpen(false), isCategoriesOpen)
  useClickAwayListener(amountRef, () => setIsAmountOpen(false), isAmountOpen)

  const onToggleCategory = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category]
    onCategoriesChange?.(newCategories)
  }

  const appliedFilters = []
  if (search) {
    appliedFilters.push({ type: 'search', label: `Search: "${search}"` })
  }
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
    if (type === 'search') {
      onSearchChange?.('')
    } else if (type === 'date') {
      onStartDateChange?.('')
      onEndDateChange?.('')
    } else if (type === 'categories') {
      onCategoriesChange?.([])
    } else if (type === 'amount') {
      onMinAmountChange?.('')
      onMaxAmountChange?.('')
    }
  }

  const onClearAllFilters = () => {
    onSearchChange?.('')
    onStartDateChange?.('')
    onEndDateChange?.('')
    onCategoriesChange?.([])
    onMinAmountChange?.('')
    onMaxAmountChange?.('')
  }

  return (
    <div className="bg-white dark:bg-[#102216] border border-[#dbe6df] dark:border-white/10 rounded-xl p-3 md:p-4 flex flex-col gap-3 md:gap-4">
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        <SearchBar 
          value={search}
          onChange={onSearchChange}
        />
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
                  onStartDateChange={onStartDateChange}
                  onEndDateChange={onEndDateChange}
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
              onMinAmountChange={onMinAmountChange}
              onMaxAmountChange={onMaxAmountChange}
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