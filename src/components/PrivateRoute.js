import React from 'react'
import {Navigate} from 'react-router-dom'
import {useGlobalContext} from '../contexts/AuthProvider'
import {useSelector} from 'react-redux' 
function PrivateRoute({children}) {

    const {currentUser} = useGlobalContext()

    const user = useSelector((state) => state.login.currentUser)

    return (
        user ? children : <Navigate to='/login' />
    )
}

export default PrivateRoute
