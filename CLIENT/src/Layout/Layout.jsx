import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../pages/Navbar/NavBar';
import Footer from '../pages/Footer/Footer';

const Layout = () => {
  return (
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout