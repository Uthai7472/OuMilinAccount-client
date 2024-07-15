import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login/Login'
import Register from './Register/Register'
import NavSideBar from './components/NavSideBar'
import Dashboard from './Dashboard/Dashboard'
import Expense from './Expense/Expense'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/expense' element={<Expense />}/>
      </Routes>
    </Router>
  )
}

export default App