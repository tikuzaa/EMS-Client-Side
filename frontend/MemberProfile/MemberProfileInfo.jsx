import { useState, useEffect } from "react";
import API from "../src/Components/Utils/axiosConfig";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaGithub
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import ProfileEditModal from "../src/Components/My profile/Profileeditmodal";

function MemberProfileInfo({ memberId }) {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await API.get(`/api/members/${memberId}`);
        setMember(response.data);
      } catch (err) {
        setError("Error fetching member data");
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [memberId]);

  const getAcademicYear = () => {
    const currentYear = new Date().getFullYear();
    const year = currentYear - member.yearOfJoining;

    if (currentYear > member.yearOfPassing) return "Alumnus";

    switch (year) {
      case 0:
        return "1st Year";
      case 1:
        return "2nd Year";
      case 2:
        return "3rd Year";
      case 3:
        return "4th Year";
      default:
        return "Unknown Year";
    }
  };

  const handleEdit = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleSave = (updatedData) => setMember(updatedData);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-lg">{error}</div>;

  return (
    <div className="bg-blue-100 rounded-lg p-6 w-full flex flex-col items-center relative">
      <img
        src={member.avatarUrl}
        alt={member.username}
        className="h-36 w-36 rounded-full object-cover border-4 border-white shadow-md"
      />

      <h2 className="mt-4 text-xl font-bold text-center">{member.username}</h2>

      <div className="flex flex-col mt-6 gap-2 items-center">
        {member.domain?.map((d, index) => (
        <span
          key={index}
          className="bg-black text-white px-3 py-1 rounded-full text-sm capitalize"
        >
          {d}
        </span>
        ))}
        <span className="bg-yellow-500 text-white font-medium px-3 py-1 rounded-full text-sm">
          {getAcademicYear()}
        </span>
      </div>

      {role === "admin" && (
        <button
          onClick={handleEdit}
          className="mt-6 text-gray-600 hover:text-blue-600 transition"
          title="Edit Profile"
        >
          <FiEdit className="h-6 w-6" />
        </button>
      )}

      <div className="mt-6 flex gap-3 text-gray-700 text-xl">
        {member.socials?.linkedin && (
          <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        )}
        {member.socials?.twitter && (
          <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
            <FaSquareXTwitter />
          </a>
        )}
        {member.socials?.github && (
          <a href={member.socials.github} target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        )}
        {member.socials?.facebook && (
          <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebookSquare />
          </a>
        )}
        {member.socials?.instagram && (
          <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        )}
      </div>

      {isModalOpen && (
        <ProfileEditModal
          member={member}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default MemberProfileInfo;
