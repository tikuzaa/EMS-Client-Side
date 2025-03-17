import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Sidebar = ({ handleLoginToggle, handleLogOut, handleAddMember }) => {

  const userRole = localStorage.getItem('userRole');
  //console.log(userRole);


  return (
    <aside className="w-64 fixed  lg:h-screen z-2  bg-gray-200 rounded-lg text-gray-800 lg:relative overflow-y-auto font-poppins">
      <nav className="mt-8 ml-2">
        <ul className="space-y-4 mr-2">
          <li>
            <NavLink 
              to={`/${userRole}/home`} 
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
            userRole === 'admin' ? (
              <li>
                <NavLink 
                  to={`/${userRole}/dashboard`} 
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
              to={`/${userRole}/projects`} 
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
              to={`/${userRole}/events`} 
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
            {userRole === "member" && 
            <NavLink 
              to={`/${localStorage.getItem("userRole")}/myprofile/${localStorage.getItem("userId")}`}
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
          {userRole === "admin" && (
          <li>
            <button onClick={handleAddMember}
            className="hover:scale-105 transition duration-300 ease-in-out p-2  hover:bg-blue-300 rounded-md w-full flex justify-start"
            >
              Add member
            </button>
          </li>
          )}
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
