import React from 'react'
import {Navigate} from 'react-router-dom'
import {useGlobalContext} from '../contexts/AuthProvider'
function PrivateRoute({children}) {

    const {currentUser} = useGlobalContext()

    return (
        currentUser ? children : <Navigate to='/login' />
    )
}

export default PrivateRoute
