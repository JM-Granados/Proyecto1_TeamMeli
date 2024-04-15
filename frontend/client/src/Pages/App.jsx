import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import CreateDataSet from './CreateDataSet'
import ForgotPass from './ForgotPass'
import Login from './Login'
import Signup from './Signup'
import NavBar from '../NavBar/NavBar'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/Forgotpass' element={<ForgotPass />}></Route>
        <Route path='/NavBar' element={<NavBar />}></Route>
        <Route path='/CreateDataSet' element={<CreateDataSet />}></Route>
      </Routes>
    </BrowserRouter> 
  )
}

export default App;