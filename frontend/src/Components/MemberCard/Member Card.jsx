import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaUserShield,
} from 'react-icons/fa';

const handleProfileView = () => {};

const MemberCard = ({ member }) => {
  const {
    skills = [],
    domains = [],
    avatarUrl,
    socials = {},
    role,
    yearOfJoining,
    yearOfPassing,
  } = member;

  // Calculate academic year
  const getAcademicYear = () => {
    const currentYear = new Date().getFullYear();
    const year = currentYear - yearOfJoining;

    if (currentYear > yearOfPassing) return 'Alumnus';

    switch (year) {
      case 0:
        return '1st Year';
      case 1:
        return '2nd Year';
      case 2:
        return '3rd Year';
      case 3:
        return '4th Year';
      default:
        return 'Unknown Year';
    }
  };

  return (
    <div className="relative max-w-xs w-[330px] h-[480px] rounded-3xl overflow-hidden shadow-lg text-center font-sans flex flex-col bg-[#dee9fc] border border-gray-200 hover:shadow-xl transition">
      {/* Admin badge */}
      {role?.toLowerCase() === 'admin' && (
        <div className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-md">
          <FaUserShield size={20} />
        </div>
      )}

      {/* Avatar */}
      <div className="flex justify-center mt-6">
        <img
          className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
          src={avatarUrl}
          alt="Profile avatar"
        />
      </div>

      {/* Skills */}
      <div className="flex flex-wrap justify-center gap-2 mt-4 px-3">
        {skills.length > 0 ? (
          skills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm capitalize min-w-[80px] text-center shadow-md"
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm shadow-md">
            Not Provided
          </span>
        )}
      </div>

      {/* Domains */}
      <div className="flex flex-wrap justify-center gap-2 mt-2 px-3">
        {member.domain.length > 0 ? (
          member.domain?.map((domain, idx) => (
            <span
              key={idx}
              className="bg-black text-white px-3 py-1 rounded-full text-sm capitalize min-w-[80px] text-center"
            >
              {domain}
            </span>
          ))
        ) : (
          <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
            Not Assigned
          </span>
        )}
      </div>

      {/* Academic year */}
      <div className="mt-2 text-gray-600 text-sm font-medium">{getAcademicYear()}</div>

      {/* Social media icons */}
      <div className="flex justify-center gap-5 mt-6 text-white text-2xl">
        {socials.linkedin && (
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 backdrop-blur-md p-3 rounded-full shadow-md text-gray-900 hover:scale-110 hover:text-blue-500 transition"
          >
            <FaLinkedin />
          </a>
        )}
        {socials.twitter && (
          <a
            href={socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 backdrop-blur-md p-3 rounded-full shadow-md text-gray-900 hover:scale-110 hover:text-blue-400 transition"
          >
            <FaTwitter />
          </a>
        )}
        {socials.github && (
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 backdrop-blur-md p-3 rounded-full shadow-md text-gray-900 hover:scale-110 hover:text-gray-700 transition"
          >
            <FaGithub />
          </a>
        )}
        {socials.instagram && (
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 backdrop-blur-md p-3 rounded-full shadow-md text-gray-900 hover:scale-110 hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>
        )}
      </div>

      {/* View Profile Button */}
      <div className="mt-auto flex justify-center p-4">
        <NavLink to={`/member/memberprofile/${member._id}`}>
          <button
            onClick={handleProfileView}
            className="bg-blue-500 text-[20px] rounded-[12px] text-white py-2 px-4 hover:bg-blue-700 transition w-[195px] h-[46px]"
          >
            View Profile
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default MemberCard;
