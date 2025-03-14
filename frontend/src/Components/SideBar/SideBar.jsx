import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Sidebar = ({ role, handleLoginToggle, handleLogOut }) => {
  return (
    <aside className="w-64 fixed  lg:h-screen z-50  bg-gray-200 rounded-lg text-gray-800 lg:relative overflow-y-auto font-poppins">
      <nav className="mt-8 ml-2">
        <ul className="space-y-4 mr-2">
          <li>
            <NavLink 
              to={`/${role}/home`} 
              className={({ isActive }) => 
                isActive 
                  ? 'bg-blue-500 text-white p-2 rounded-md block transition duration-300 ease-in-out' 
                  : 'p-2 block hover:bg-blue-300 rounded-md transition duration-300 ease-in-out transform hover:scale-105'
              }
            >
              Home
            </NavLink>
          </li>
          {
            role === 'admin' ? (
              <li>
                <NavLink 
                  to={`/${role}/dashboard`} 
                  className={({ isActive }) => 
                    isActive 
                      ? 'bg-blue-500 text-white p-2 rounded-md block transition duration-300 ease-in-out' 
                      : 'p-2 block hover:bg-blue-300 rounded-md transition duration-300 ease-in-out transform hover:scale-105'
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            ) : (<></>)
          }
          <li>
            <NavLink 
              to={`/${role}/projects`} 
              className={({ isActive }) => 
                isActive 
                  ? 'bg-blue-500 text-white p-2 rounded-md block transition duration-300 ease-in-out' 
                  : 'p-2 block hover:bg-blue-300 rounded-md transition duration-300 ease-in-out transform hover:scale-105'
              }
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink 
              to={`/${role}/events`} 
              className={({ isActive }) => 
                isActive 
                  ? 'bg-blue-500 text-white p-2 rounded-md block transition duration-300 ease-in-out' 
                  : 'p-2 block hover:bg-blue-300 rounded-md transition duration-300 ease-in-out transform hover:scale-105'
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            {role === "member" && 
            <NavLink 
              to={`/${role}/myprofile`} 
              className={({ isActive }) => 
                isActive 
                  ? 'bg-blue-500 text-white p-2 rounded-md block transition duration-300 ease-in-out' 
                  : 'p-2 block hover:bg-blue-300 rounded-md transition duration-300 ease-in-out transform hover:scale-105'
              }
            >
              My Profile
            </NavLink>
            
            }
          </li>
          <li>
            <Link to='/'>
              <button onClick={handleLogOut} className="logout-btn block ">LogOut</button>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
