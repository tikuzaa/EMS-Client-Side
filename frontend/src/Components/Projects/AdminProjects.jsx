import React, { useState, useEffect } from "react";
import API from "../Utils/axiosConfig";

const AdminProject = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    status: "Ongoing",
    progress: 0,
    deadline: "",
    team: [],
    githubLink: "",
    deploymentLink: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await API.get("/api/projects");
      if (response.data.success) {
        setProjects(response.data.data);
      } else {
        console.error("Error fetching projects:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleAddProject = () => {
    setIsModalOpen(true);
    setIsNewProject(true);
    setProjectDetails({
      name: "",
      status: "Ongoing",
      progress: 0,
      deadline: "",
      team: [],
      githubLink: "",
      deploymentLink: "",
    });
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setProjectDetails({ ...project });
    setIsModalOpen(true);
    setIsNewProject(false);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await API.delete(`/api/projects/${projectId}`);
      if (response.data.success) {
        fetchProjects();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleSaveProject = async () => {
    try {
      let response;
      if (isNewProject) {
        response = await API.post("/api/projects", projectDetails);
      } else {
        response = await API.put(`/api/projects/${selectedProject._id}`, projectDetails);
      }

      if (response.data.success) {
        fetchProjects();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>

        {user.role === "admin" && (
          <button className="mt-6 bg-green-500 text-white py-2 px-4 rounded" onClick={handleAddProject}>
            Add New Project
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project._id} className="bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p>Status: {project.status}</p>
                <p>Progress: {project.progress}%</p>
                <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>

                {user.role === "admin" && (
                  <div className="mt-2">
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                      onClick={() => handleEditProject(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded"
                      onClick={() => handleDeleteProject(project._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{isNewProject ? "Add New Project" : `Edit Project`}</h2>
            <label className="block mb-2">Project Name</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={projectDetails.name}
              onChange={(e) => setProjectDetails({ ...projectDetails, name: e.target.value })}
              placeholder="Enter Name"
            />
            <label className="block mb-2">Deadline</label>
            <input
              type="date"
              className="border p-2 w-full"
              value={projectDetails.deadline}
              onChange={(e) => setProjectDetails({ ...projectDetails, deadline: e.target.value })}
            />
            <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded" onClick={handleSaveProject}>
              {isNewProject ? "Add Project" : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProject;
