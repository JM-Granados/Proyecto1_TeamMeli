import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Login from './Login'
import ForgotPass from './ForgotPass'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/ForgotPass' element={<ForgotPass />}></Route>
      </Routes>
    </BrowserRouter> 
  )
}

export default App;