import { useState, useEffect } from "react";
import API from "../Utils/axiosConfig"; 
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

function Profileinfo({ memberId }) { // Changed from "member" to "memberId" (passed as a prop)
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await API.get(`/api/members/${memberId}`); // Use Axios to fetch member data
        setMember(response.data);
      } catch (err) {
        setError("Error fetching member data");
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [memberId]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="bg-blue-100 rounded-lg p-4 flex flex-col items-center shadow-md">
      <img src={member.avatar} alt={member.name} className="h-36 w-36 rounded-full" /> 
      <h2 className="mt-4 font-semibold text-lg">{member.name}</h2>

      <div className="flex flex-col mt-8 gap-3 items-center">
        <button className="bg-black text-white px-2 py-1 rounded hover:text-yellow-500">
          {member.domain}
        </button>
        <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:text-neutral-800">
          {member.year}
        </button>
      </div>

      <div className="mt-8">
        <FaRegEdit className="h-9 w-auto" />
      </div>

      <div className="mt-8 mb-2 space-x-4 flex text-2xl text-gray-700 gap-2 h-8">
        {/* Check if links exist before rendering them to avoid errors */}
        {member.socialMedia?.linkedin && (
          <a href={member.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="h-7 w-auto" />
          </a>
        )}
        {member.socialMedia?.twitter && (
          <a href={member.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
            <FaSquareXTwitter className="h-7 w-auto" />
          </a>
        )}
        {member.socialMedia?.github && (
          <a href={member.socialMedia.github} target="_blank" rel="noopener noreferrer">
            <FaGithub className="h-7 w-auto" />
          </a>
        )}
        {member.socialMedia?.facebook && (
          <a href={member.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebookSquare className="h-7 w-auto" />
          </a>
        )}
        {member.socialMedia?.instagram && (
          <a href={member.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram className="h-7 w-auto" />
          </a>
        )}
      </div>
    </div>
  );
}

export default Profileinfo;
