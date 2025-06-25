import React, { useEffect, useState } from 'react';
import API from '../Utils/axiosConfig';

const MemberProjectComponent = ({ memberId }) => {
  const [projectsData, setProjectsData] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await API.get(`/api/projects/member/${memberId}`); // corrected endpoint
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

  useEffect(() => {
    if (memberId) fetchProjects();
  }, [memberId]);

  const ongoing = projectsData.filter(p => p.progress < 100);
  const completed = projectsData.filter(p => p.progress === 100);

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {[{
        title: "Ongoing Projects",
        data: ongoing,
        bg: "bg-white"
      }, {
        title: "Completed Projects",
        data: completed,
        bg: "bg-gray-200"
      }].map(({ title, data, bg }) => (
        <section key={title} className={`shadow-lg rounded-lg p-6 ${bg}`}>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.length > 0 ? (
              data.map((project) => (
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
                  {project.deploymentLink && (
                    <p>
                      <a href={project.deploymentLink} target="_blank" rel="noopener noreferrer" className="text-green-500 underline">
                        Deployed Site
                      </a>
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No projects in this category.</p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default MemberProjectComponent;