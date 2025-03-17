import React, { useEffect, useState } from 'react';
import API from '../Utils/axiosConfig'; // Import Axios instance

const MemberProjectComponent = ({ memberId }) => {
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await API.get(`/projects/member/${memberId}`); // API request to fetch projects for the member
        setProjectsData(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    if (memberId) fetchProjects();
  }, [memberId]);

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Ongoing Projects Section */}
      <section
        style={{ backgroundColor: 'rgba(242, 159, 103, 0.4)' }}
        className="shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Ongoing Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 z-0">
          {projectsData
            .filter((project) => project.status === 'Ongoing')
            .map((project) => (
              <div key={project.id} className="bg-gray-50 p-4 rounded-lg shadow flex justify-between transition duration-300 ease-in-out transform hover:scale-105">
                <div className="w-1/2">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p>Status: {project.status}</p>
                  <p>Progress: {project.progress}%</p>
                  <p>Deadline: {project.deadline}</p>
                  {project.githubLink && (
                    <p>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        GitHub Repository
                      </a>
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <h4 className="font-bold">Your Role: {project.team.find(member => member.id === memberId)?.name || 'Not Assigned'}</h4>
                  <ul className="pl-4 list-disc">
                    {project.team
                      .filter((member) => member.id === memberId)
                      .map((member) => (
                        <li key={member.id}>{member.name} - {member.assign}</li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Completed Projects Section */}
      <section
        style={{ backgroundColor: 'rgba(187, 247, 208, 0.9)' }}
        className="shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Completed Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData
            .filter((project) => project.status === 'Completed')
            .map((project) => (
              <div key={project.id} className="bg-gray-50 p-4 rounded-lg shadow flex justify-between transition duration-300 ease-in-out transform hover:scale-105">
                <div className="w-1/2">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p>Status: {project.status}</p>
                  <p>Progress: {project.progress}%</p>
                  <p>Deadline: {project.deadline}</p>
                  {project.githubLink && (
                    <p>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        GitHub Repository
                      </a>
                    </p>
                  )}
                  {project.deploymentLink && (
                    <p>
                      <a href={project.deploymentLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        Deployment Link
                      </a>
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <h4 className="font-bold">Your Role: {project.team.find(member => member.id === memberId)?.name || 'Not Assigned'}</h4>
                  <ul className="pl-4 list-disc">
                    {project.team
                      .filter((member) => member.id === memberId)
                      .map((member) => (
                        <li key={member.id}>{member.name} - {member.assign}</li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default MemberProjectComponent;
