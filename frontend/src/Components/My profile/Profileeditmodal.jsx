import { useState } from "react";
import { toast } from "react-toastify";
import API from "../Utils/axiosConfig";

const ProfileEditModal = ({ member, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    username: member?.username || "",
    email: member?.email || "",
    password: "",
    role: member?.role || "member",
    domain: member?.domain || [],
    socials: member?.socialMedia || {},
    yearOfJoining: member?.yearOfJoining || "",
    yearOfPassing: member?.yearOfPassing || "",
    stream: member?.stream || "",
    universityRollNumber: member?.universityRollNumber || "",
    skills: member?.skills || [],
    avatarPreview: member?.avatarUrl || "",
    avatarFile: null,
  });

  const [tab, setTab] = useState("personal");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        avatarFile: reader.result,
        avatarPreview: reader.result,
      });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
  try {
    const payload = {
      username: formData.username,
      email: formData.email,
      role: formData.role,
      domain: formData.domain,
      socials: formData.socials,
      yearOfJoining: formData.yearOfJoining,
      yearOfPassing: formData.yearOfPassing,
      stream: formData.stream,
      universityRollNumber: formData.universityRollNumber,
      skills: formData.skills,
    };

    if (formData.avatarFile) {
      // Only send if user selected a new file (Base64 string)
      payload.avatarUrl = formData.avatarFile;
    }

    if (formData.password?.trim()) {
      payload.password = formData.password;
    }

    const res = await API.put(`/api/members/${member._id}`, payload);
    toast.success("Profile updated successfully");
    onSave(res.data); // update parent
    onClose();
  } catch (err) {
    toast.error("Update failed. Please try again.");
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-4">
          {['personal', 'academic', 'social'].map((t) => (
            <button
              key={t}
              className={`px-4 py-1 rounded-full text-sm font-medium ${tab === t ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* PERSONAL TAB */}
        {tab === "personal" && (
          <>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full border px-3 py-2 rounded mb-3"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border px-3 py-2 rounded mb-3"
            />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Reset Password (optional)"
              className="w-full border px-3 py-2 rounded mb-3"
            />

            <label className="block text-sm font-medium mb-1">Avatar</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="mb-3" />
            {formData.avatarPreview && (
              <img src={formData.avatarPreview} alt="Preview" className="h-20 w-20 rounded-full mb-3" />
            )}
          </>
        )}

        {/* ACADEMIC TAB */}
        {tab === "academic" && (
          <>
            <select
              name="stream"
              value={formData.stream}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-3"
            >
              <option value="">Select Stream</option>
              <option value="Computer Science">Computer Science</option>
              <option value="IT">IT</option>
              <option value="Electronics">Electronics</option>
              <option value="Other">Other</option>
            </select>

            <select
              name="domain"
              value={formData.domain[0] || ""}
              onChange={(e) => setFormData({ ...formData, domain: [e.target.value] })}
              className="w-full border px-3 py-2 rounded mb-3"
            >
              <option value="">Select Domain</option>
              <option value="web development">Web Development</option>
              <option value="app development">App Development</option>
              <option value="ml">ML</option>
              <option value="design">Design</option>
            </select>

            <input
              name="universityRollNumber"
              value={formData.universityRollNumber}
              onChange={handleChange}
              placeholder="University Roll Number"
              className="w-full border px-3 py-2 rounded mb-3"
            />

            <input
              name="yearOfJoining"
              type="number"
              value={formData.yearOfJoining}
              onChange={handleChange}
              placeholder="Year of Joining"
              className="w-full border px-3 py-2 rounded mb-3"
            />

            <input
              name="yearOfPassing"
              type="number"
              value={formData.yearOfPassing}
              onChange={handleChange}
              placeholder="Year of Passing"
              className="w-full border px-3 py-2 rounded mb-3"
            />
          </>
        )}

        {/* SOCIAL TAB */}
        {tab === "social" && (
          <>
            {['linkedin', 'twitter', 'github', 'instagram'].map((social) => (
              <input
                key={social}
                name={social}
                value={formData.socials?.[social] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socials: { ...formData.socials, [social]: e.target.value },
                  })
                }
                placeholder={social.charAt(0).toUpperCase() + social.slice(1)}
                className="w-full border px-3 py-2 rounded mb-3"
              />
            ))}
          </>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;