import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ThemeSwitch from "../../components/ThemeSwitch";
import "./NavBar.css";
import Profile from '../../components/Profile';

function NavBar() {
  const authStatus = useSelector((state) => state.auth.status);
  const dark = useSelector((state) => state.themeChanger.dark);
  const theme = useSelector((state) => state.themeChanger.theme);

  const navItems = [
    { to: "/login", active: !authStatus, name: "Login" },
    { to: "/SignUp", active: !authStatus, name: "SignUp" },
    { to: "/events", active: authStatus, name: "Events" }
  ];

  return (
    <nav className={`navbar navbar-expand-lg ${dark ? "bg-dark-subtle" : "bg-primary-subtle"} p-3`} data-bs-theme={theme}>
      <div className="container">
        <NavLink to='/' className="navbar-brand fw-bold ">Event Booking</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto fw-bold">
            {navItems.map((item, index) => (
              item.active && (
                <li key={index} className="nav-item mx-2">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `${dark ? "text-light-custom" : "text-dark-custom"} ${isActive ? "nav-link text-danger" : "nav-link"}`}
                  >
                    {item.name}
                  </NavLink>
                </li>
              )
            ))}
            {authStatus && (
              <li className="nav-item dropdown mx-2">
                <a className={`nav-link dropdown-toggle ${dark ? "text-light-custom" : "text-dark-custom"}`} href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Your Events
                </a>
                <ul className={`dropdown-menu ${dark ? "bg-dark text-light" : "bg-light text-dark"}`} aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink to="/create-event" className={`dropdown-item ${dark?"":"light-theme"}`}>Create Event</NavLink>
                  </li>
                  <li>
                    <NavLink to="/edit-event" className={`dropdown-item ${dark?"":"light-theme"}`}>Edit Event</NavLink>
                  </li>
                  <li>
                    <NavLink to="/delete-event" className={`dropdown-item ${dark?"":"light-theme"}`}>Delete Event</NavLink>
                  </li>
                </ul>
              </li>
            )}
            {authStatus && (
              <li className="nav-item mx-2">
                <Profile />
              </li>
            )}
            <li className="nav-item mx-2">
              <ThemeSwitch />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
