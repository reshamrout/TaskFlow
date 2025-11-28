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
import TaskForm from './components/TaskForm'
import Navbar from './components/Navbar'
import FeatureCard from './components/FeatureCard'

function App() {
  return (
    <div>
      
        <div>
          <Navbar/>
        </div>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/signup' element={<SignupPage/>}></Route>
      <Route path='/test' element={<FeatureCard/>}></Route>
      <Route path='*' element={<Home/>}></Route>
    </Routes>
    </div>
    
  )
}

export default App
