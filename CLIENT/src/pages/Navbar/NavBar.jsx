import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from '../../components/Logout/Logout';
import "./NavBar.css"
import ThemeSwitch from "../../components/ThemeSwitch"

function NavBar() {
  const authStatus = useSelector((state) => state.auth.status);
  const dark = useSelector((state) => (state.themeChanger.dark))
  const theme = useSelector((state) => (state.themeChanger.theme))

  const navItems = [
    {
      to: "/login",
      active: !authStatus,
      name: "Login"
    },
    {
      to: "/SignUP",
      active: !authStatus,
      name: "SignUp"
    },
    {
      to: "/events",
      active: authStatus,
      name: "Events"
    },
  ]





  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${dark ? "bg-dark-subtle" : "bg-primary-subtle"} p-3 `} data-bs-theme={theme}>
      <div className="container">
        <NavLink to='/'
          className={`navbar-brand ${({ isActive }) => isActive ? " active fw-bold text-danger" : " nav-link"} `} >Event Booking</NavLink>
        <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto fw-bold ">
            {navItems.map((items, index) => (items.active ? (
              <li key={index} className="nav-item focus-ring-dark mx-2">
                <NavLink

                  to={items.to}
                  className={({ isActive }) =>
                    `${dark ? "text-light-custom" : "text-dark-custom"} ${isActive ? "nav-link text-danger" : "nav-link"}`
                  }>
                   {items.name} </NavLink>
              </li>) : null))
            }
            {
              authStatus && <li className={`nav-item  ${dark ? "" : "text-dark"} focus  mx-2`}> <Logout /> </li>
            }
            <ThemeSwitch />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;