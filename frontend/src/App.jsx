import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
    <Header />
      <Outlet></Outlet>
      <ToastContainer />
    </>
    
  )
}

