import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../tailwind.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Clone from './Clone'
import CreateDataSet from './CreateDataSet'
import DataSetsNotis from './DataSetsNotis'
import Dm from './Dm'
import ForgotPass from './ForgotPass'
import Home from './Home'
import LikedDown from './LikedDown'
import Login from './Login'
import MyDataSetInfo from './MyDataSetInfo'
import MyDataSets from './MyDataSets'
import MyVotes from './MyVotes'
import OtherUserAcc from './OtherUserAcc'
import Signup from './Signup'
import UserConf from './UserConf'
import UserDataset from './UserDataset'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Clone' element={<Clone />}></Route>
        <Route path='/CreateDataSet' element={<CreateDataSet />}></Route>
        <Route path='/DataSetsNotis' element={<DataSetsNotis />}></Route>
        <Route path='/Dm' element={<Dm />}></Route>
        <Route path='/Forgotpass' element={<ForgotPass />}></Route>
        <Route path='/Home' element={<Home />}></Route>
        <Route path='/LikedDown' element={<LikedDown />}></Route>
        <Route path='/' element={<Login />}></Route>
        <Route path='/MyDataSetInfo' element={<MyDataSetInfo />}></Route>
        <Route path='/MyDataSets' element={<MyDataSets />}></Route>
        <Route path='/MyVotes' element={<MyVotes />}></Route>
        <Route path='/OtherUserAcc' element={<OtherUserAcc />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/UserConf' element={<UserConf />}></Route>
        <Route path='/UserDataset' element={<UserDataset />}></Route>
      </Routes>
    </BrowserRouter> 
  )
}

export default App;