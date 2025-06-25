import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Sidebar = ({ handleLoginToggle, handleLogOut, handleAddMember }) => {
  const userRole = localStorage.getItem('userRole');

  const navLinkClasses = ({ isActive }) =>
    isActive
      ? 'bg-blue-500 text-white p-2 rounded-md block transition duration-300 ease-in-out'
      : 'p-2 block hover:bg-blue-300 rounded-md transition duration-300 ease-in-out transform hover:scale-105';

  return (
    <aside className="w-full lg:w-64 h-full bg-gray-200 text-gray-800 font-poppins p-4">
      <nav className="mt-4">
        <ul className="space-y-4">
          <li>
            <NavLink to={`/${userRole}/home`} className={navLinkClasses}>
              Home
            </NavLink>
          </li>

          {userRole === 'admin' && (
            <li>
              <NavLink to={`/${userRole}/dashboard`} className={navLinkClasses}>
                Dashboard
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to={`/${userRole}/projects`} className={navLinkClasses}>
              Projects
            </NavLink>
          </li>

          <li>
            <NavLink to={`/${userRole}/events`} className={navLinkClasses}>
              Events
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`/${userRole}/myprofile/${localStorage.getItem("userId")}`}
              className={navLinkClasses}
            >
              My Profile
            </NavLink>
          </li>

          {userRole === 'admin' && (
            <li>
              <button
                onClick={handleAddMember}
                className="hover:scale-105 transition duration-300 ease-in-out p-2 hover:bg-blue-300 rounded-md w-full text-left"
              >
                Add member
              </button>
            </li>
          )}

          <li>
            <Link to="/">
              <button onClick={handleLogOut} className="logout-btn block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full">
                LogOut
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;