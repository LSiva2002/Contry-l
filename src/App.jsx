import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from './components/Navbar'
import './style/app.css'
import { ToastContainer } from 'react-toastify';
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';


function App() {
  return (
    <>
       <ToastContainer position="top-right" autoClose={2000} />
      <Navbar /> 
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Signup' element={<Signup />}/>
      </Routes>

    </>
  )
}

export default App
