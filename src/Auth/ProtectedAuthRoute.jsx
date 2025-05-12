import React, { useContext } from 'react'
import { authContext } from '../Contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import Home from '../pages/Home/Home'

export default function ProtectedAuthRoute({children}) {

const {isLoggedIn} = useContext(authContext)

  return (
    <div> 
        {!isLoggedIn ? children : <Navigate to={'/'} />}
    </div>
  )
}
