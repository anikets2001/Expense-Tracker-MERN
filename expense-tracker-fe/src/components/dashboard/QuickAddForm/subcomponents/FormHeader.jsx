import React from 'react'

const FormHeader = ({ title, icon = "add_circle" }) => {
  return (
    <div className="p-4 md:p-6 border-b border-[#dbe6df] dark:border-[#2a3a2e]">
      <h3 className="text-base md:text-lg font-bold text-[#111813] dark:text-white flex items-center gap-2">
        <span className={`material-symbols-outlined ${icon === 'add_circle' ? 'text-primary' : ''}`}>{icon}</span>
        {title}
      </h3>
    </div>
  )
}

export default FormHeader