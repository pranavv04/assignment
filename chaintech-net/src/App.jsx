import { useState } from 'react'

import './App.css'
import Signup from './components/Signup'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Userpage from './components/Userpage'
import Login from './components/Login'
import Home from './components/Home'
function App() {


  return (
    <>
     <Router>
     <div className="flex flex-col min-h-screen">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user/:username' element={<Userpage/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login />}/>
        
      </Routes>

     </div>
     </Router>


    </>
  )
}

export default App
