  import React from 'react'
  import { NavLink } from 'react-router-dom'
  import Logout from './Logout/Logout'
  import { useSelector } from 'react-redux';


  function Profile() {
    const dark = useSelector((state) => state.themeChanger.dark);
    return (
      <div>
        <li className="nav-item dropdown mx-2">
          <a className={`nav-link dropdown-toggle ${dark ? "text-light-custom" : "text-dark-custom"}`} href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Your Profile
          </a>
          <ul className={`dropdown-menu ${dark ? "bg-dark text-light" : "bg-light text-dark"}`} aria-labelledby="navbarDropdown">
            <li id='EditPassword'>
              <NavLink to="/edit-password" className={`dropdown-item ${dark ? "" : "light-theme"}`}>Edit Pasword</NavLink>
            </li>
            <li id="EditUsername">
              <NavLink to="/edit-username" className={`dropdown-item ${dark ? "" : "light-theme"}`}>Edit Username</NavLink>
            </li>
            <li id='Edit Email'>
              <NavLink to="/edit-email" className={`dropdown-item ${dark ? "" : "light-theme"}`}>Edit Email</NavLink>
            </li>
            <li id='Delete Profile'>
              <NavLink to="/delete-event" className={`dropdown-item ${dark ? "" : "light-theme"}`}>Delete Profile</NavLink>
            </li>
            <li>
              <Logout className={`dropdown-item ${dark ? "" : "light-theme"}`} />
            </li>
          </ul>
        </li>

      </div>

    )
  }

  export default Profile