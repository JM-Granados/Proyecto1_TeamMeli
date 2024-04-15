import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Clone from './clone'
import CreateDataSet from './CreateDataSet'
import DataSetNotis from './DataSetNotis'
import Dm from './Dm'
import ForgotPass from './ForgotPass'
import Home from './Home'
import LikedDownload from './LikedDownload'
import Login from './Login'
import MyDataSetInfo from './MyDataSetInfo'
import MyDataSets from './MyDataSets'
import MyVotes from './MyVotes'
import OtherUserAcc from './OtherUserAcc'
import Signup from './Signup'
import UserConf from './UserConf'
import UserDataSet from './UserDataSet'
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