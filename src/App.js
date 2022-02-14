import React, {useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import AuthProvider from './contexts/AuthProvider'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './components/ForgotPassword'
import User from './components/User'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from './redux/Login/loginAction'
import {auth} from './firebase'
function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(setUser(authUser));
      }else{
        dispatch(setUser(null));
      }
    });
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
