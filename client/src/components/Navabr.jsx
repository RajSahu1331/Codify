// import React from 'react'
// import {Link} from "react-router-dom"
// import { useContext } from 'react'
// import { UserContext } from '../context/userContext'

// export default function Navabr() {
//   const {user} = useContext(UserContext)
//   return (
//     <div>
//       <Link to = '/home'>Home</Link>
//       <Link to = '/register'>Register</Link>
//       {user?(<h3>hii {user.name}</h3>):(<Link to = '/login'>Login</Link>)}
//     </div>
//   )
// }

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useContext } from 'react'
import { UserContext } from '../context/userContext'

function Navbar() {
  const {user} = useContext(UserContext)
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Codify
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/add"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
              Create
              </NavLink>
            </li>
            <li className="nav-item">
            {user?(<h4 className="name">{user.name}</h4>):(<NavLink
                exact
                to="/login"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
              Log In
              </NavLink>)}
              
            </li>
            <li className="nav-item">
            {user?(<NavLink
                exact
                to="/login"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
              Log Out
              </NavLink>):(<NavLink
                exact
                to="/register"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
              Sign Up
              </NavLink>)}
              
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;