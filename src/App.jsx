// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './pages/Hero'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        
      </Routes>
    </Router>
  )
}

export default App