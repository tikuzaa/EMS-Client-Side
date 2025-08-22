import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar1 from "./Components/Header/Navbar1";
import Footer from "./Components/Footer/Footer";
import FooterMin from "./Components/Footer/FooterMin";
import Sidebar from "./Components/SideBar/SideBar";
import AddMemberModal from "./Components/Modal/AddMemberModal";
import { useNavigate } from "react-router-dom";



function Layout({ role }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  // show navbar ONLY on the login page route
  const showNavbar = location.pathname === "/login";
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    setIsLoggedIn(!!userData);
  }, [location]);

  const handleLoginToggle = () => {
    if (isLoggedIn) {
      localStorage.removeItem("userData");
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("memberData");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    navigate('/login')
    handleLoginToggle();
    

  };

  const handleSidebarToggle = () => setSidebarOpen((v) => !v);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddMember = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

 // Layout.jsx

return (
  <>
    {/* Navbar only on /login */}
    {showNavbar && (
      <Navbar1
        role={role}
        isLoggedIn={isLoggedIn}
        handleLoginToggle={handleLoginToggle}
        handleSidebarToggle={handleSidebarToggle}
      />
    )}

    {isLoggedIn ? (
      <div className={`flex flex-col lg:flex-row min-h-screen ${showNavbar ? "pt-16" : ""}`}>
        {/* Sidebar stays visible after login */}
        <div className={`w-64 bg-gray-200 ${sidebarOpen ? "block" : "hidden"} lg:block`}>
          <Sidebar role={role} handleLogOut={handleLogOut} handleAddMember={handleAddMember} />
        </div>

        <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          <Outlet context={{ handleLoginToggle }} />
        </main>
      </div>
    ) : (
      // Public pages (login) — no sidebar
      <div className={`${showNavbar ? "pt-16" : ""}`}>
        <Outlet context={{ handleLoginToggle }} />
      </div>
    )}

    {/* 👇 Show footer on all pages EXCEPT /login */}
    {location.pathname !== "/login" && (
      isLoggedIn ? <FooterMin /> : <Footer />
    )}

    {isModalOpen && <AddMemberModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
  </>
);

}

export default Layout;
