import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import AuthProvider from './contexts/AuthProvider'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './components/ForgotPassword'
import User from './components/User'
function App() {



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
