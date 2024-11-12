import React, { useState } from 'react'
import Navbar1 from './Components/Header/Navbar1'; // Adjust the path as necessary
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer/Footer'; // Adjust the path as necessary
import Sidebar from './Components/SideBar/SideBar';

function Layout({role}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const handleLoginToggle = () => {
      setIsLoggedIn(!isLoggedIn);
      console.log('Login state toggled:', isLoggedIn,role);
    };

  return (
    <>
    <Navbar1 role={role} isLoggedIn={isLoggedIn} handleLoginToggle={handleLoginToggle} />
    {isLoggedIn?
      (<div className={`flex flex-col lg:flex-row`}>
        <Sidebar role={role} className="lg:w-64 w-full lg:h-auto h-screen lg:fixed lg:top-0 lg:left-0 fixed top-0 left-0 lg:block hidden" />
        <div className="flex-1 lg:ml-2 mt-16 lg:mt-0">
          <Outlet context={{ handleLoginToggle }} />
        </div>
      </div>):
      (<Outlet context={{ handleLoginToggle }} />)
    }

    <Footer />
    </>
  )
}

export default Layout
