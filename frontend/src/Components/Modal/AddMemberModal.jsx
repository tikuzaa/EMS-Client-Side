import React, { useState } from "react";
import Modal from "react-modal";
import API from "../Utils/axiosConfig"; // Ensure this is the correct path to your axios configuration

const AddMemberModal = ({ isModalOpen, setIsModalOpen }) => {
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

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleArrayChange = (e, index, field) => {
    const { value } = e.target;
    setNewMember((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  const addArrayItem = (field) => {
    setNewMember((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    setNewMember((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await API.post("/api/members", newMember);
      console.log("Member added successfully:", response.data);
      setSuccess("Member added successfully!");
      setIsModalOpen(false); // Close the modal
    } catch (err) {
      console.error("Error adding member:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to add member. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20 max-h-[80vh] overflow-y-auto lg:mx-0 mx:4 will-change-transform scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        overlayClassName="bg-opacity-30 backdrop-blur-sm fixed inset-0 bg-black flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Member</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={newMember.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newMember.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newMember.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={newMember.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="domain"
            placeholder="Domain"
            value={newMember.domain}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <h3 className="font-medium">Social Links</h3>
          <input
            type="text"
            name="socials.linkedin"
            placeholder="LinkedIn"
            value={newMember.socials.linkedin}
            onChange={handleNestedChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="socials.twitter"
            placeholder="Twitter"
            value={newMember.socials.twitter}
            onChange={handleNestedChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="socials.instagram"
            placeholder="Instagram"
            value={newMember.socials.instagram}
            onChange={handleNestedChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="yearOfJoining"
            placeholder="Year of Joining"
            value={newMember.yearOfJoining}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="yearOfPassing"
            placeholder="Year of Passing"
            value={newMember.yearOfPassing}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="stream"
            placeholder="Stream"
            value={newMember.stream}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="universityRollNumber"
            placeholder="University Roll Number"
            value={newMember.universityRollNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="avatarUrl"
            placeholder="Avatar URL"
            value={newMember.avatarUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <h3 className="font-medium">Skills</h3>
          {newMember.skills.map((skill, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleArrayChange(e, index, "skills")}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeArrayItem("skills", index)}
                className="ml-2 text-red-500"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("skills")}
            className="text-blue-500"
          >
            + Add Skill
          </button>
          {/* Repeat similar structure for projects, events, and attendance */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddMemberModal;
