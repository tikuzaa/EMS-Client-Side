// ✅ Final Updated ProjectComponent (fully functional and admin-editable progress slider)

import React, { useState, useEffect } from "react";
import API from "../Utils/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProjectComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [allMembers, setAllMembers] = useState([]);
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    description: "",
    deadline: "",
    githubLink: "",
    deploymentLink: "",
    progress: 0,
    team: [],
  });
  const [projectsData, setProjectsData] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await API.get(`/api/projects`);
      if (response.data.success) {
        setProjectsData(response.data.data);
      }
    } catch (error) {
      toast.error("Error fetching projects.");
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await API.get('/api/members');
      setAllMembers(res.data);
    } catch (err) {
      toast.error("Failed to fetch members");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = () => {
    fetchMembers();
    setIsModalOpen(true);
    setIsNewProject(true);
    setSelectedProject(null);
    setProjectDetails({ name: "", description: "", deadline: "", githubLink: "", deploymentLink: "", progress: 0, team: [] });
  };

  const handleEditProject = (project) => {
    fetchMembers();
    setIsModalOpen(true);
    setIsNewProject(false);
    setSelectedProject(project);
    setProjectDetails({
      name: project.name,
      description: project.description,
      deadline: project.deadline?.split("T")[0] || "",
      githubLink: project.githubLink,
      deploymentLink: project.deploymentLink,
      progress: project.progress,
      team: project.team.map(member => ({ id: member.id?._id || member.id, assign: member.assign })),
    });
  };

  const handleSaveProject = async () => {
    try {
      const payload = {
        ...projectDetails,
        status: projectDetails.progress === 100 ? "completed" : "ongoing",
      };

      if (isNewProject) {
        await API.post("/api/projects", payload);
        toast.success("Project added successfully!");
      } else {
        await API.put(`/api/projects/${selectedProject._id}`, payload);
        toast.success("Project updated!");
      }

      setIsModalOpen(false);
      fetchProjects();
    } catch (error) {
      toast.error("Error saving project.");
    }
  };

  const handleDeleteProject = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this project?");
    if (!confirm) return;

    try {
      await API.delete(`/api/projects/${id}`);
      toast.success("Project deleted!");
      fetchProjects();
    } catch (err) {
      toast.error("Failed to delete project.");
    }
  };

  const ongoingProjects = projectsData.filter(p => p.progress < 100);
  const completedProjects = projectsData.filter(p => p.progress === 100);

  return (
    <div className="p-6 space-y-6 font-poppins min-h-screen bg-gray-50">
      <ToastContainer position="top-right" />

      {/* Add Project Button */}
      <div className="mb-6">
        <button
          onClick={handleAddProject}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          + Add New Project
        </button>
      </div>

      {/* Project Lists */}
      {[{
        title: "Ongoing Projects",
        data: ongoingProjects,
        bg: "bg-white"
      }, {
        title: "Completed Projects",
        data: completedProjects,
        bg: "bg-gray-200"
      }].map(({ title, data, bg }) => (
        <section key={title} className={`shadow-lg rounded-lg p-6 ${bg}`}>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.length > 0 ? (
              data.map((project) => (
                <div key={project._id} className="bg-gray-50 p-4 rounded-lg shadow-md relative">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p>Status: {project.status}</p>
                  <p>Progress: {project.progress}%</p>
                  <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                  {project.githubLink && <p><a href={project.githubLink} target="_blank" rel="noreferrer" className="text-blue-500 underline">GitHub</a></p>}
                  {project.deploymentLink && <p><a href={project.deploymentLink} target="_blank" rel="noreferrer" className="text-green-500 underline">Deployed Site</a></p>}
                  <div className="absolute top-3 right-3 space-x-2">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No projects in this category.</p>
            )}
          </div>
        </section>
      ))}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">{isNewProject ? "Add Project" : "Edit Project"}</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Project Name" className="w-full border px-3 py-2 rounded" value={projectDetails.name} onChange={(e) => setProjectDetails({ ...projectDetails, name: e.target.value })} />
              <textarea placeholder="Description" className="w-full border px-3 py-2 rounded" value={projectDetails.description} onChange={(e) => setProjectDetails({ ...projectDetails, description: e.target.value })}></textarea>
              <input type="date" className="w-full border px-3 py-2 rounded" value={projectDetails.deadline} onChange={(e) => setProjectDetails({ ...projectDetails, deadline: e.target.value })} />
              <input type="text" placeholder="GitHub Link" className="w-full border px-3 py-2 rounded" value={projectDetails.githubLink} onChange={(e) => setProjectDetails({ ...projectDetails, githubLink: e.target.value })} />
              <input type="text" placeholder="Deployment Link" className="w-full border px-3 py-2 rounded" value={projectDetails.deploymentLink} onChange={(e) => setProjectDetails({ ...projectDetails, deploymentLink: e.target.value })} />

              {/* Progress Slider */}
              <div>
                <label className="block font-medium mb-1">Progress: {projectDetails.progress}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={projectDetails.progress}
                  onChange={(e) => setProjectDetails({ ...projectDetails, progress: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Team Section */}
              <div>
                <h3 className="font-semibold mb-2">Team Members</h3>
                {projectDetails.team.map((member, index) => (
                  <div key={index} className="flex gap-2 items-center mb-2">
                    <select
                      className="w-1/2 border px-2 py-2 rounded"
                      value={member.id}
                      onChange={(e) => {
                        const updatedTeam = [...projectDetails.team];
                        updatedTeam[index].id = e.target.value;
                        setProjectDetails({ ...projectDetails, team: updatedTeam });
                      }}
                    >
                      <option value="">Select Member</option>
                      {allMembers.map((m) => (
                        <option key={m._id} value={m._id}>{m.username} ({m.email})</option>
                      ))}
                    </select>

                    <input
                      type="text"
                      className="w-1/2 border px-2 py-2 rounded"
                      placeholder="Assigned Task"
                      value={member.assign}
                      onChange={(e) => {
                        const updatedTeam = [...projectDetails.team];
                        updatedTeam[index].assign = e.target.value;
                        setProjectDetails({ ...projectDetails, team: updatedTeam });
                      }}
                    />

                    <button
                      onClick={() => {
                        const updatedTeam = projectDetails.team.filter((_, i) => i !== index);
                        setProjectDetails({ ...projectDetails, team: updatedTeam });
                      }}
                      className="text-red-500 font-bold text-lg"
                    >×</button>
                  </div>
                ))}
                <button
                  onClick={() => setProjectDetails({ ...projectDetails, team: [...projectDetails.team, { id: "", assign: "" }] })}
                  className="text-blue-600 mt-2"
                >+ Add Member</button>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleSaveProject} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">{isNewProject ? "Create" : "Update"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectComponent;
