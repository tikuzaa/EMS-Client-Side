import React, { useState } from 'react';
import './Navbar1.css'
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({role, isLoggedIn, handleLoginToggle }) => {
 
  console.log('Navbar isLoggedIn:', isLoggedIn)

  return (
<nav className="navbar">
        <div className="navbar-logo">
          <img src="./src/assets/Images/logo.png" alt="logo" className='logo' />
          <h1>Emp<span>Space</span></h1>
        </div>
        {isLoggedIn ? (
          <div className='flex justify-center items-center ml-8'>
            <Link to='/about'>
          <button className="about-btn">About</button>
          </Link>
          <Link to='/'>
          <button onClick={handleLoginToggle} className="logout-btn">LogOut</button>
          </Link>
          </div>
        ):(
          <div className='flex justify-center items-center ml-8'>
          <Link to='/about'>
          <button className="about-btn">About</button>
          </Link>
          </div>
        )}
        
      </nav>

  );
};

export default Navbar;
