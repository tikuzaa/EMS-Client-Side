import React, { useState } from "react";
import Modal from "react-modal";

const AddMemberModal = ({isModalOpen, setIsModalOpen}) => {

  
  // New Member State
  const [newMember, setNewMember] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    domain: "",
    socials: {
      linkedin: "",
      twitter: "",
      instagram: "",
    },
    yearOfJoining: "",
    yearOfPassing: "",
    stream: "",
    universityRollNumber: "",
    avatarUrl: "",
    skills: [],
    projects: [],
    events: [],
    attendance: [],
  });

  // Handle Simple Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Nested Object Change (like socials)
  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split(".");

    setNewMember((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value,
      },
    }));
  };

  // Handle Array Change (like skills, projects)
  const handleArrayChange = (e, index, field) => {
    const { value } = e.target;
    setNewMember((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  // Add New Item to an Array
  const addArrayItem = (field) => {
    setNewMember((prev) => ({
      ...prev,
      [field]: [...prev[field], ""], // Add empty item
    }));
  };

  // Remove Item from Array
  const removeArrayItem = (field, index) => {
    setNewMember((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Handle Form Submit (You can send the newMember object to the backend here)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Add Member Button */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        onClick={() => setIsModalOpen(true)}
      >
        Add Member
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20 max-h-[80vh] overflow-y-auto lg:mx-0 mx:4 will-change-transform scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        overlayClassName=" bg-opacity-30 backdrop-blur-sm  fixed inset-0 bg-black flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Member</h2>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Simple Fields */}
          <input type="text" name="username" placeholder="Username" value={newMember.username} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="email" name="email" placeholder="Email" value={newMember.email} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="password" name="password" placeholder="Password" value={newMember.password} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="role" placeholder="Role" value={newMember.role} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="domain" placeholder="Domain" value={newMember.domain} onChange={handleChange} className="w-full p-2 border rounded" />

          {/* Socials (Nested Fields) */}
          <h3 className="font-medium">Social Links</h3>
          <input type="text" name="socials.linkedin" placeholder="LinkedIn" value={newMember.socials.linkedin} onChange={handleNestedChange} className="w-full p-2 border rounded" />
          <input type="text" name="socials.twitter" placeholder="Twitter" value={newMember.socials.twitter} onChange={handleNestedChange} className="w-full p-2 border rounded" />
          <input type="text" name="socials.instagram" placeholder="Instagram" value={newMember.socials.instagram} onChange={handleNestedChange} className="w-full p-2 border rounded" />

          {/* Education Fields */}
          <input type="text" name="yearOfJoining" placeholder="yearOfJoining" value={newMember.yearOfJoining} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="yearOfPassing" placeholder="yearOfPassing" value={newMember.yearOfPassing} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="stream" placeholder="stream" value={newMember.stream} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="universityRollNumber" placeholder="universityRollNumber" value={newMember.universityRollNumber} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="avatarUrl" placeholder="avatarUrl" value={newMember.avatarUrl} onChange={handleChange} className="w-full p-2 border rounded" />

          {/* Dynamic Arrays (Skills) */}
          <h3 className="font-medium">Skills</h3>
          {newMember.skills.map((skill, index) => (
            <div key={index} className="flex items-center">
              <input type="text" value={skill} onChange={(e) => handleArrayChange(e, index, "skills")} className="w-full p-2 border rounded" />
              <button type="button" onClick={() => removeArrayItem("skills", index)} className="ml-2 text-red-500">×</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("skills")} className="text-blue-500">+ Add Skill</button>
          {/* Dynamic Arrays (projects) */}
          <h3 className="font-medium">projects</h3>
          {newMember.projects.map((skill, index) => (
            <div key={index} className="flex items-center">
              <input type="text" value={skill} onChange={(e) => handleArrayChange(e, index, "projects")} className="w-full p-2 border rounded" />
              <button type="button" onClick={() => removeArrayItem("projects", index)} className="ml-2 text-red-500">×</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("projects")} className="text-blue-500">+ Add Projects</button>
          {/* Dynamic Arrays (events) */}
          <h3 className="font-medium">events</h3>
          {newMember.events.map((skill, index) => (
            <div key={index} className="flex items-center">
              <input type="text" value={skill} onChange={(e) => handleArrayChange(e, index, "events")} className="w-full p-2 border rounded" />
              <button type="button" onClick={() => removeArrayItem("events", index)} className="ml-2 text-red-500">×</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("events")} className="text-blue-500">+ Add Events</button>
          {/* Dynamic Arrays (attendance) */}
          <h3 className="font-medium">attendance</h3>
          {newMember.attendance.map((skill, index) => (
            <div key={index} className="flex items-center">
              <input type="text" value={skill} onChange={(e) => handleArrayChange(e, index, "attendance")} className="w-full p-2 border rounded" />
              <button type="button" onClick={() => removeArrayItem("attendance", index)} className="ml-2 text-red-500">×</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("attendance")} className="text-blue-500">+ Add Attendance</button>












          {/* Submit & Close Buttons */}
          <div className="flex justify-end space-x-4 mt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddMemberModal;
