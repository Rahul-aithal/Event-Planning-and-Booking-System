import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-secondary p-3">
      <div className="container">
        <NavLink to='/'
                className={`navbar-brand ${({ isActive }) => isActive ? "nav-link active ":" nav-link"} `} >Event Booking</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto fw-bold ">
            <li className="nav-item focus-ring-dark">
              <NavLink
                to='/login'
                className={({ isActive }) => isActive ? "nav-link active  text-info" : "nav-link"}
              >Login</NavLink></li>
            <li className="nav-item focus-ring-dark"><NavLink
              to='/register'
              className={({ isActive }) => isActive ? "nav-link active  text-info" : "nav-link"}
            >Register</NavLink></li>
            <li className="nav-item focus-ring-dark"><NavLink
              to='/events'
              className={({ isActive }) => isActive ? "nav-link active  text-info" : "nav-link"}
            >Events</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;