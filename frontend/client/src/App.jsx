import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import ForgotPass from './ForgotPass'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/Forgotpass' element={<ForgotPass />}></Route>
      </Routes>
    </BrowserRouter> 
  )
}

export default App;