import React, { useEffect, useState } from "react";
import API from "../Utils/axiosConfig"; // Import the Axios instance

const AdminDashboard = () => {
  const [membersData, setMembersData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersRes, projectsRes, eventsRes] = await Promise.all([
          API.get("/api/members"),
          API.get("/api/projects"),
          API.get("/api/events"),
        ]);

        setMembersData(membersRes.data);
        setProjectsData(projectsRes.data.data);
        setEventsData(eventsRes.data.data);
        console.log("Data fetched successfully",membersRes.data, projectsRes.data.data, eventsRes.data.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show loading state
  if (loading) return <p className="text-center text-xl">Loading...</p>;

  // Show error state
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Get total members
  const totalMembers = membersData.length;

  // Group members by domain
  const domainMembers = membersData.reduce((acc, member) => {
    acc[member.domain] = acc[member.domain] ? acc[member.domain] + 1 : 1;
    return acc;
  }, {});

  // Separate Active and Inactive members
  const activeMembers = membersData.filter(
    (member) => member.performance > 80 && member.attendance > 80
  );
  const inactiveMembers = membersData.filter(
    (member) => member.performance <= 20 || member.attendance <= 20
  );

  // Filter upcoming events
  const getUpcomingEvents = () => {
    const today = new Date().toISOString().split("T")[0];
    return eventsData.filter((event) => event.date >= today);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Total Members and Domain Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Members Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Total Members</h2>
          <p className="text-4xl font-semibold text-blue-500">{totalMembers}</p>
        </div>

        {/* Domain Members Overview */}
        {Object.keys(domainMembers).map((domain) => (
          <div key={domain} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold">{domain}</h2>
            <p className="text-2xl font-semibold text-gray-700">
              {domainMembers[domain]} Members
            </p>
          </div>
        ))}
      </section>

      {/* Overall Member Statistics */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Overall Members Statistics</h2>
        
        {/* Active Members Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Active Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeMembers.map((member) => (
              <div key={member.id} className="bg-gray-50 p-4 rounded-lg shadow">
                <h4 className="text-lg font-semibold">{member.name}</h4>
                <p>Performance: {member.performance}%</p>
                <p>Attendance: {member.attendance}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Inactive Members Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Inactive Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {inactiveMembers.map((member) => (
              <div key={member.id} className="bg-gray-50 p-4 rounded-lg shadow">
                <h4 className="text-lg font-semibold">{member.name}</h4>
                <p>Performance: {member.performance}%</p>
                <p>Attendance: {member.attendance}%</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData
            .filter((project) => project.progress < 100)
            .map((project) => (
              <div key={project.id} className="bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p>Progress: {project.progress}%</p>
                <p>Status: {project.status}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getUpcomingEvents().map((event) => (
            <div key={event.id} className="bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{event.name}</h3>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
