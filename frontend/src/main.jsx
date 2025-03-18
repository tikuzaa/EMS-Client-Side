import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import EmployeeMgmt from './Components/Landing/EmployeeMgmt.jsx';
import Login from './Components/Login/Login.jsx';
import Signup from './Components/SignUp/SignUp.jsx';
import Layout from './Layout.jsx';
import Error from './Components/Error/Error.jsx';
import HomePage from './Components/HomePage/HomePage.jsx';
import AdminDashboard from './Components/Dashboard/AdminDashboard.jsx';
import AdminProjects from './Components/Projects/AdminProjects.jsx';
import MemberProjects from './Components/Projects/MemberProjects.jsx';
import AdminEvents from './Components/Events/AdminEvents.jsx';
import MemberEvents from './Components/Events/MemberEvents.jsx';
import Myprofile from './Components/My profile/Myprofile.jsx';
import { membersData } from './Data/membersData.js';
import axios from "../src/Components/Utils/axiosConfig.js";
import { projectsData } from './Data/projectsData.js';
import { eventsData } from './Data/eventsData.js';
import Modal from "react-modal";
import { UserRoleProvider } from './Components/Utils/UserRoleContext.jsx';
import MemberProfile from '../../MemberProfile/MemberProfile.jsx';

Modal.setAppElement("#root");

const userData = localStorage.getItem("userData");
localStorage.setItem("userData", userData)

const App = ({ setMembersData }) => {
  return null; // No need to render anything
};

const Main = () => {
  const [membersData, setMembersData] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("/api/members");
        setMembersData(response.data);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };

    fetchMembers();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<EmployeeMgmt />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/home" element={<HomePage />} />
        <Route path="/member/home" element={<HomePage members={membersData} />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/projects" element={<AdminProjects projectsData={projectsData} membersData={membersData} />} />
        <Route path="/admin/events" element={<AdminEvents eventsData={eventsData} membersData={membersData} />} />
        <Route path="/member/projects" element={<MemberProjects projectsData={projectsData} memberId={localStorage.getItem("userId")} />} />
        <Route path="/member/events" element={<MemberEvents eventsData={eventsData} membersData={membersData} />} />
        <Route path="/member/myprofile/:id" element={<Myprofile members={membersData} />} />
        <Route path="/member/memberprofile/:id" element={<MemberProfile/>} />
        <Route path="/admin/myprofile/:id" element={<Myprofile members={membersData} />} />
        <Route path="*" element={<Error />} />
      </Route>
    )
  );

  return (
    <StrictMode>
      <UserRoleProvider>
        <RouterProvider router={router} />
      </UserRoleProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<Main />);
