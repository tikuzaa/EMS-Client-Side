import React, { useEffect, useState } from 'react'
import Navbar1 from './Components/Header/Navbar1'; 
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer/Footer'; 
import FooterMin from './Components/Footer/FooterMin';
import Sidebar from './Components/SideBar/SideBar';

function Layout({role}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

useEffect(() => {
  const userData = localStorage.getItem("userData");
  if (userData !== "null") {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }
}, [setIsLoggedIn]);

    
  
    const handleLoginToggle = () => {
      if (isLoggedIn) {
        localStorage.removeItem("userData"); 
        setIsLoggedIn(false);
      } else {
        localStorage.setItem("userData", "someUserData");
        setIsLoggedIn(true);
      }
    };

    const handleLogOut = () => {
      //remove userdata and jwt token from local storage
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      handleLoginToggle();
      console.log(isLoggedIn);
    }
    

    const handleSidebarToggle = () => { 
      setSidebarOpen(!sidebarOpen);
     };

     useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 1024) { 
          setSidebarOpen(true);
        }
      };
  
      window.addEventListener("resize", handleResize);
      handleResize(); 
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);



  return (
    <>


    {/* console.log(isLoggedIn) */}
    <Navbar1 role={role} isLoggedIn={isLoggedIn} handleLoginToggle={handleLoginToggle} handleSidebarToggle={handleSidebarToggle}/>
    {isLoggedIn?
      (<div className={`flex flex-col lg:flex-row`}>
        <div className={`lg:h-screen lg:w-64 w-full bg-gray-200 
        transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} `}
        ><Sidebar role={role} handleLogOut={handleLogOut} className="lg:h-screen z-1" /></div>

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

