import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import { Login } from './components/Login'
import { Signup } from './components/Signup'

const MainRoutes = () => {
  return (
    <div>
        
        <Routes>
         <Route path="/" element={<Dashboard/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/signup" element={<Signup/>}/>
        </Routes>
    </div>
  )
}

export default MainRoutes