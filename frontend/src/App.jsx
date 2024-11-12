import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router components
import EmployeeMgmt from './Components/Landing/EmployeeMgmt';


function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Employee Management (Landing) page */}
        <Route path="/" element={<EmployeeMgmt />} />
      </Routes>
    </Router>
  );
}

export default App