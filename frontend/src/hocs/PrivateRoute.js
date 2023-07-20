import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import { Outlet, Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch()
    const { isLoading, isLoggedIn } = useSelector((state) => state.auth)
  
    if (isLoading) return null; // <-- or loading spinner, etc...
  
    return isLoggedIn ? <Outlet /> : <Navigate to='/login' replace />
  }

export default PrivateRoute;