import React, { useState } from "react";
import "./Navbar1.css";
import { Link } from "react-router-dom";

const Navbar = ({
  role,
  isLoggedIn,
  handleLoginToggle,
  handleSidebarToggle,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav className="navbar ">
      <div className="grid grid-cols-2 gap-20 lg:flex lg:justify-between lg:items-center w-full">
        <div className="navbar-logo">
          <img src="./src/assets/Images/logo.png" alt="logo" className="logo" />
          <h1>
            Emp<span>Space</span>
          </h1>
        </div>
        <div className="flex justify-center items-center ml-8">
          {isLoggedIn ? (
            <div>
              <Link to="/about"></Link>

              {isLoggedIn && (
                console.log(isLoggedIn),
                <div className="responsive-sidebar">
                  <button
                    className="lg:hidden block p-2 text-white bg-gray-800 rounded-md m-4"
                    onClick={handleSidebarToggle}
                  >
                    <h1>Menu</h1>
                  </button>
                </div>
              )}

              <Link to="/">
                <button
                  onClick={handleLoginToggle}
                  className="logout-btn hidden lg:block"
                >
                  LogOut
                </button>
              </Link>
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
