import { useState, useEffect } from "react";
import API from "../src/Components/Utils/axiosConfig.js";

function ProjectRow({ project }) {
  return (
    <tr key={project.id} className="hover:bg-blue-300 transition-colors">
      <td className="p-2 border-b rounded-s-3xl">{project.name}</td>
      <td className="p-2 border-b">{project.status}</td>
      <td className="p-2 border-b">{project.progress}</td>
      <td className="p-2 border-b rounded-e-3xl">{project.deadline}</td>
    </tr>
  );
}

function MemberProjects({ ID }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => { 
    const fetchProjects = async () => {
      try {
        const response = await API.get(`/api/projects?memberId=${userId}`); 
        setProjects(response.data.data);
        console.log(response.data.data);
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
      <div className="w-full overflow-x-hidden">
        <h3 className="font-semibold border-b px-2 border-neutral-800 pb-1">Projects/Assignments</h3>
        <table className="w-full border-separate border-spacing-0 text-center text-sm lg:text-base">
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
            .filter((project) => project.team.some(member => member.id?.['_id'] === userId))
            .map((project) => (
              <ProjectRow key={project._id} project={project} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MemberProjects;
