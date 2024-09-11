import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Welcome from '../componenets/Welcome'
import Sign from '../componenets/Sign'
import Login from '../componenets/Login'
import Homepage from '../componenets/Homepage'
import Verifyyour from '../componenets/verifyyour'
import Thanks from '../componenets/Thanks'
import Account from '../componenets/Account'
import Persional from '../componenets/Persional'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/SignIn' element={<Sign />} />
          <Route path='/LogIn' element={<Login />} />
          <Route path='/Home' element={<Homepage />} />
          <Route path='/verifyemail' element={<Verifyyour />} />
          <Route path='/Thanks' element={<Thanks />} />
          <Route path='/your_account' element={<Account />} />
          <Route path='/more-info' element={<Persional />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
