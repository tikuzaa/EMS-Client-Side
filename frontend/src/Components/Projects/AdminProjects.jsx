import React, { useState } from "react";
import API from "../Utils/axiosConfig"; 

const ProjectComponent = ({ projectsData, membersData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    deadline: "",
    team: [],
  });

  const handleEditTeam = (project) => {
    setSelectedProject(project);
    setProjectDetails({
      name: project.name,
      deadline: project.deadline,
      team: project.team,
    });
    setIsModalOpen(true);
    setIsNewProject(false);
  };

  const handleAddProject = () => {
    setIsModalOpen(true);
    setIsNewProject(true);
    setProjectDetails({ name: "", deadline: "", team: [] });
  };

  const handleTeamMemberAssign = (member, assign) => {
    setProjectDetails((prevDetails) => {
      const updatedTeam = prevDetails.team.filter((m) => m.id !== member.id);
      return {
        ...prevDetails,
        team: [...updatedTeam, { id: member.id, name: member.name, assign }],
      };
    });
  };

  const handleSaveProject = async () => {
    try {
      if (isNewProject) {
        const newProject = {
          name: projectDetails.name,
          status: "Ongoing",
          progress: 0,
          deadline: projectDetails.deadline,
          githubLink: "",
          deploymentLink: "",
          team: projectDetails.team,
        };
        const response = await API.post("/api/projects", newProject); // ✅ Use API instance
        console.log("New Project Added:", response.data);
      } else {
        const updatedProject = {
          ...selectedProject,
          team: projectDetails.team,
        };
        await API.put(`/api/projects/${selectedProject.id}`, updatedProject); // ✅ Update existing project
        console.log("Team Updated:", updatedProject);
      }
    } catch (error) {
      console.error("Error saving project:", error);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6 font-poppins min-h-screen">
      {/* Ongoing Projects Section */}
      <section
        style={{ backgroundColor: "rgba(242, 159, 103, 0.5)" }}
        className="shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Ongoing Projects</h2>
        <button
          className="mt-6 bg-[#1f456e] text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-[#163b54] transform hover:scale-105"
          onClick={handleAddProject}
        >
          Add New Project
        </button>
      </section>

      {/* Modal for Adding/Editing Projects */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {isNewProject ? "Add New Project" : `Edit Team for ${selectedProject.name}`}
            </h2>
            <button
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-[#009E60] transform hover:scale-105"
              onClick={handleSaveProject}
            >
              {isNewProject ? "Add Project" : "Save Team"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectComponent;
