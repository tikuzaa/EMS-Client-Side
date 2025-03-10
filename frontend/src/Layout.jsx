import React, { useEffect, useState } from 'react'
import Navbar1 from './Components/Header/Navbar1'; 
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer/Footer'; 
import FooterMin from './Components/Footer/FooterMin';
import Sidebar from './Components/SideBar/SideBar';
import { X } from "lucide-react";

function Layout({role}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
      const userData = localStorage.getItem("userData");
      if (userData !== null) {
        setIsLoggedIn(true);
        console.log(isLoggedIn);
        console.log('logged');
        console.log(isLoggedIn);
      } else {
        setIsLoggedIn(false);
        console.log(isLoggedIn);
        console.log('unlogged');
      }
    }, []);
    
  
    const handleLoginToggle = () => {
      if (isLoggedIn) {
        localStorage.removeItem("userData"); // Logging out
        setIsLoggedIn(false);
      } else {
        localStorage.setItem("userData", "someUserData"); // Dummy login
        setIsLoggedIn(true);
      }
      console.log('Login state toggled:', isLoggedIn, role);
    };
    

    const handleSidebarToggle = () => { 
      setSidebarOpen((prev) => !prev);
     };

     const handleClickOutside = (event) => {
      if (sidebarOpen && !event.target.closest(".sidebar-container")) {
        setSidebarOpen(false);
      }
    };

  return (
    <>



    <Navbar1 role={role} isLoggedIn={isLoggedIn} handleLoginToggle={handleLoginToggle} handleSidebarToggle={handleSidebarToggle}/>
    {isLoggedIn?
      (<div className={`flex flex-col lg:flex-row`}>
        <div className={`lg:h-screen lg:w-64 w-full bg-gray-200 
        transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}  `}
        ><Sidebar role={role} className="lg:h-screen z-1" /></div>

        <div className="flex-1 lg:ml-12 mt-16 lg:mt-0">
          <Outlet context={{ handleLoginToggle }} />
        </div>
      </div>):
      (<Outlet context={{ handleLoginToggle }} />)
    }

{isLoggedIn ? <FooterMin /> : <Footer />}
    </>
  );
}

export default Layout

