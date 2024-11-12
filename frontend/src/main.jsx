import { StrictMode, useState } from 'react';
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
import { membersData } from './Data/membersData.js';
import { projectsData } from './Data/projectsData.js';
import { eventsData } from './Data/eventsData.js';

const Main = () => {
  // Set initial role; modify 'member' or 'admin' as required
  const [role, setRole] = useState('member');

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout role={role} />}>
        {/* Default page */}
        <Route index element={<EmployeeMgmt setRole={setRole} />} />

        {/* Role-based Login and Signup */}
        <Route path="/admin/login" element={<Login role={role} />} />
        <Route path="/member/login" element={<Login role={role} setRole={setRole} />} />
        <Route path="/member/signup" element={<Signup />} />

        {/* Home Page for Both Roles */}
        <Route path="/admin/home" element={<HomePage members={membersData} role={role} />} />
        <Route path="/member/home" element={<HomePage members={membersData} role={role} />} />

        {/* Admin Dashboard */}
        {role === 'admin' && (
          <>
            <Route
              path="/admin/dashboard"
              element={
                <AdminDashboard
                  membersData={membersData}
                  projectsData={projectsData}
                  eventsData={eventsData}
                />
              }
            />
            <Route
              path="/admin/projects"
              element={<AdminProjects projectsData={projectsData} membersData={membersData} />}
            />
            <Route
              path="/admin/events"
              element={<AdminEvents eventsData={eventsData} membersData={membersData} />}
            />
          </>
        )}

        {/* Member Projects */}
        {role === 'member' && (
          <Route
            path="/member/projects"
            element={<MemberProjects projectsData={projectsData} memberId={101} />} // pass the logged-in memberId
          />
        )}

        {/* Error Page for Unmatched Routes */}
        <Route path="*" element={<Error />} />
      </Route>
    )
  );

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<Main />);