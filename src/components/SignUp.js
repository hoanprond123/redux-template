import React, {useRef, useState, useEffect} from 'react'
import {useGlobalContext} from '../contexts/AuthProvider'
import {Link, useNavigate} from 'react-router-dom'

import {signup1} from '../redux/Login/loginAction'
import { useDispatch, useSelector } from 'react-redux'


const SignUp = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const {currentUser, signup} = useGlobalContext()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const user = useSelector((state) => state.login.currentUser)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return setError('Password do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch {
            setError('Failed to sign up')
        }
        setLoading(false)
        
    }

    const handleSignup = (e) => {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return setError('Password do not match')
        }

        dispatch(signup1(emailRef.current.value, passwordRef.current.value))
    }

    useEffect(() => {
        if(user) {
            navigate('/')
        }
    },[user])

    return (
        <div className="form-sign-up">
            <div className="grid wide form-sign-up-inside">
                <div className="form-sign-up-container">
                    <h2>Sign Up</h2>
                    {error && <h1>{error}</h1>}
                    <form onSubmit={handleSignup}>
                        <div className="form-sign-up-input">
                            <label>Email</label>
                            <input ref={emailRef} type="email" placeholder="your email address" required /> 
                        </div>
                        <div className="form-sign-up-input">
                            <label>Password</label>
                            <input ref={passwordRef} type="password" placeholder="your password" required /> 
                        </div>
                        <div className="form-sign-up-input">
                            <label>Password Confirmation</label>
                            <input ref={passwordConfirmationRef} type="password" placeholder="your password" required /> 
                        </div>
                        <button disabled={loading} className="btn">Sign Up</button>
                    </form>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
