import React, { useState } from "react";
import "./Navbar1.css";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/logo.png";

const Navbar = ({
  role,
  isLoggedIn,
  handleLoginToggle,
  handleSidebarToggle,
  handleLogOut,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  

  return (
    <nav className="navbar ">
      <div className="grid grid-cols-2 gap-20 lg:flex lg:justify-between lg:items-center w-full">
        <div className="navbar-logo">
          <img src={logo} alt="logo" className="logo" />
          <h1>
            Emp<span>Space</span>
          </h1>
        </div>
        <div className="flex justify-center items-center ml-8">
          {isLoggedIn ? (
            <div>
              <Link to="/about"></Link>

              {isLoggedIn && (
                
                <div className="responsive-sidebar">
                  <button
                    className="lg:hidden block p-2 text-white bg-gray-800 rounded-md m-4"
                    onClick={handleSidebarToggle}
                  >
                    <h1>Menu</h1>
                  </button>
                </div>
              )}

              {isLoggedIn && <Link to="/">
                {/* <button
                  onClick={handleLogOut}
                  className="logout-btn hidden lg:block"
                >
                  LogOut
                </button> */}
                
              </Link>}
            </div>
          ) : (
            <Link to="/about"></Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
