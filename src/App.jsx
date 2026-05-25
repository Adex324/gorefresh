import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './pages/Hero'
import About from './pages/About'
import Loading from './components/Loading';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import VerifyCode     from './pages/VerifyCode';
import NewPassword from './pages/NewPassword';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [showLoading, setShowLoading] = useState(true);

  if (showLoading) {
    return <Loading onFinish={() => setShowLoading(false)} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/"      element={<Hero />}  />
        <Route path="/about" element={<About />} />
        <Route path = "/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code"     element={<VerifyCode />}     />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App