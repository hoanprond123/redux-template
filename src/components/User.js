import React, {useRef, useState} from 'react'
import {useGlobalContext} from '../contexts/AuthProvider'
import { useNavigate} from 'react-router-dom'
import Navbar from './Navbar'
import {logout1} from '../redux/Login/loginAction'
import {useDispatch, useSelector} from 'react-redux'
const User = () => {

    const {logout} = useGlobalContext()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.login.currentUser)

    // Sử dụng react-redux
    const handleLogout1 = () => {
        if(user) {
            dispatch(logout1())
            navigate('/login')
        }
    }

    // Sử dụng useContext
    const handleLogout = async () => {


        try {
            setError('')
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to logout')
        }
    }



    return (
        <>
            <Navbar />
            <div className="form-sign-up">
                <div className="grid wide form-sign-up-inside">
                    <div className="form-sign-up-container">
                        <h2>Profile</h2>
                        {error && <h1>{error}</h1>}
                        <button disabled={loading} onClick={handleLogout1}>Log out</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User
