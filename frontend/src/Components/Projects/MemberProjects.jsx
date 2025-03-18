import React, { useEffect, useState } from 'react';
import API from '../Utils/axiosConfig';

const MemberProjectComponent = ({ memberId }) => {
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await API.get(`/api/projects?memberId=${memberId}`); // ✅ Fetch projects assigned to this member
        if (response.data.success) {
          setProjectsData(response.data.data);
          console.log("Member projects fetched successfully:", response.data.data);
          
        } else {
          console.error("Error fetching member projects:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    if (memberId) fetchProjects();
  }, [memberId]);

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Ongoing Projects Section */}
      <section className="shadow-lg rounded-lg p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">Ongoing Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.length > 0 ? (
            projectsData
              .filter((project) => project.status === 'Ongoing')
              .map((project) => (
                <div key={project._id} className="bg-gray-50 p-4 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p>Status: {project.status}</p>
                  <p>Progress: {project.progress}%</p>
                  <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                </div>
              ))
          ) : (
            <p>No ongoing projects assigned to you.</p>
          )}
        </div>
      </section>

      {/* Completed Projects Section */}
      <section className="shadow-lg rounded-lg p-6 bg-gray-200">
        <h2 className="text-2xl font-bold mb-4">Completed Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.length > 0 ? (
            projectsData
              .filter((project) => project.status === 'Completed')
              .map((project) => (
                <div key={project._id} className="bg-white p-4 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p>Status: {project.status}</p>
                  <p>Progress: {project.progress}%</p>
                  <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                  {project.githubLink && (
                    <p>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        GitHub Repository
                      </a>
                    </p>
                  )}
                </div>
              ))
          ) : (
            <p>No completed projects assigned to you.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default MemberProjectComponent;