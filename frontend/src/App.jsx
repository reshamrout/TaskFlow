import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import { Link } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div>
      <div className='flex my-5'>
        <div className=' flex gap-2 font-extrabold'>
          <p>
            <Link to="/home">Home</Link>
          </p>
          <p>
            <Link to="/login">Login</Link>
          </p>
          <p>
            <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/signup' element={<SignupPage/>}></Route>
      <Route path='*' element={<Home/>}></Route>
    </Routes>
    </div>
    
  )
}

export default App
