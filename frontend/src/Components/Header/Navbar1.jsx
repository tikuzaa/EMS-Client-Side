import React, { useState } from 'react';
import './Navbar1.css';
import { Link } from 'react-router-dom';

const Navbar = ({ role, isLoggedIn, handleLoginToggle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  return (
    <nav className="navbar">
      
      <div className="navbar-logo">
        <img src="./src/assets/Images/logo.png" alt="logo" className='logo' />
        <h1>Emp<span>Space</span></h1>
      </div>
      <div className='flex justify-center items-center ml-8'>
        
        {isLoggedIn ? (
          <>
            <Link to='/about'>
             
            </Link>
            <Link to='/'>
              <button onClick={handleLoginToggle} className="logout-btn">LogOut</button>
            </Link>
          </>
        ) : (
          <Link to='/about'>
           
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;