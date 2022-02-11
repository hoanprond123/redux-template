import React, {useRef, useState} from 'react'
import {useGlobalContext} from '../contexts/AuthProvider'

const ForgotPassword = () => {

    const emailRef = useRef()
    const {currentUser, resetPassword} = useGlobalContext()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your email box')
        } catch {
            setError('Failed to reset password')
        }
        setLoading(false)
        
    }

    return (
        <div className="form-sign-up">
            <div className="grid wide form-sign-up-inside">
                <div className="form-sign-up-container">
                    <h2>Reset Password</h2>
                    {message && <span>{message}</span>}
                    {error && <h1>{error}</h1>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-sign-up-input">
                            <label>Email</label>
                            <input ref={emailRef} type="email" placeholder="your email address" required /> 
                        </div>
                        <button disabled={loading} className="btn">Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
