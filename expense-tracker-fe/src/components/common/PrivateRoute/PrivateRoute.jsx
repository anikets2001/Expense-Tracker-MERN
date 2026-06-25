import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { useGetMeQuery } from '../../../redux/services/authApi'

const PrivateRoute = () => {
  const token = useSelector((state) => state.auth.token)
  const { isLoading, isError } = useGetMeQuery(undefined, { skip: !token })

  if (!token || isError) {
    return <Navigate to="/login" replace />
  }

  if (isLoading) {
    return null
  }

  return <Outlet />
}

export default PrivateRoute
