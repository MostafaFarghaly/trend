import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children ,userData}) {
    if(!userData) {
        <Navigate to='/login'/>
    }else{
        return children;
    }
}
