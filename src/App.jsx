import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login/Login'
import Register from './Register/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './Dashboard/Dashboard'
import Expense from './Expense/Expense'
import axios from 'axios';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  // Fetch expenses from API
  useEffect(() => {
    if (token) {
      setLoading(true);
      axios.get('https://oumilin-account-server.onrender.com/api/expense/show', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        setExpenses(response.data.expenses);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard expenses={expenses} loading={loading} />} />} />
        <Route path='/expense' element={<ProtectedRoute element={<Expense expenses={expenses} loading={loading} />} />} />
      </Routes>
    </Router>
  )
}

export default App