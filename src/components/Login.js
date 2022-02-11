import React, {useRef, useState, useEffect} from 'react'
import {useGlobalContext} from '../contexts/AuthProvider'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {login1} from '../redux/Login/loginAction'
const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const {currentUser, login} = useGlobalContext()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.login.currentUser)


    // Sử dụng useContext
    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch {
            setError('Failed to login')
        }
        setLoading(false)
    }

    

    // Sử dụng react-redux
    const handleSend =  (e) => {
        e.preventDefault()

        dispatch(login1(emailRef.current.value, passwordRef.current.value))
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
                    <h2>Login</h2>
                    {error && <h1>{error}</h1>}
                    <form onSubmit={handleSend}>
                        <div className="form-sign-up-input">
                            <label>Email</label>
                            <input ref={emailRef} type="email" placeholder="your email address" required /> 
                        </div>
                        <div className="form-sign-up-input">
                            <label>Password</label>
                            <input ref={passwordRef} type="password" placeholder="your password" required /> 
                        </div>
                        <button disabled={loading} className="btn">Login</button>
                    </form>
                    <Link className="form-sign-up-container-forgot" to='/forgot-password'>Forgot Password</Link>
                    <p>Do not have an account? <Link to='/signup'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login
