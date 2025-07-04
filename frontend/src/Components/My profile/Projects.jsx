import { useState, useEffect } from "react";
import API from "../Utils/axiosConfig"; 

function ProjectRow({ project }) {
  const formattedDeadline = new Date(project.deadline).toLocaleDateString('en-GB'); // DD/MM/YYYY

  return (
    <tr key={project.id} className="hover:bg-blue-300 transition-colors">
      <td className="p-2 border-b rounded-s-3xl">{project.name}</td>
      <td className="p-2 border-b">{project.status}</td>
      <td className="p-2 border-b">{project.progress}</td>
      <td className="p-2 border-b rounded-e-3xl">{formattedDeadline}</td>
    </tr>
  );
}

function Projects({ ID }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  

  useEffect(() => { 
    const fetchProjects = async () => {
      try {
        const response = await API.get(`/api/projects?memberId=${userId}`); 
        setProjects(response.data.data);

      } catch (err) {
        setError("Error fetching project data");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [ID]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="bg-blue-100 rounded-lg space-y-2 shadow-md">
      <div className="w-full overflow-x-auto">
        <h3 className="font-semibold border-b px-2 py-4 border-neutral-800 pb-1">Projects/Assignments</h3>
        <table className="min-w-full border-separate border-spacing-0 text-center text-sm lg:text-base">
          <thead>
            <tr className="bg-inherit">
              <th className="p-2">Name</th>
              <th className="p-2">Status</th>
              <th className="p-2">Progress</th>
              <th className="p-2">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {projects
            .filter((project) => project.team.some(member => member.id?.['_id'] == userId.toString()))
            .map((project) => (
              <ProjectRow key={project._id} project={project} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Projects;
