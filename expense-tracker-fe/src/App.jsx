import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Transactions from './pages/Transactions/Transactions'
import Login from './pages/Login/Login'

function App() {
  useEffect(() => {
    document.body.className = 'bg-background-light dark:bg-background-dark font-display text-[#111813] dark:text-white transition-colors duration-200'
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
