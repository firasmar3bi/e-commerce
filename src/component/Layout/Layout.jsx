import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { useNavigate } from "react-router-dom";

export default function Layout({user,setUser}) {
  const navigate = useNavigate();

  function logOut(){
    localStorage.removeItem('userToken');
    setUser(null)
    navigate('/Login')
  }

  return (
    <>
        <Navbar user={user} logOut={logOut} />
        <div className='container'>
          <Outlet></Outlet>
        </div>
        <Footer />
    </>
  )
}
