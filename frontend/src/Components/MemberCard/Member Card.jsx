import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub, FaUserShield } from 'react-icons/fa'; // Icons for social media and admin

  const MemberCard = ({member}) => {
    const { name, department, domain, year, socialMedia, expertIn, isAdmin, profileImage } = member;
    return (
      <div className="max-w-xs h-[450px] w-[330px] rounded-3xl overflow-hidden shadow-lg text-center font-sans">
        <div className="bg-blue-500 h-[160px] flex items-center justify-center relative">
          {/* <div className="w-24 h-24 bg-black rounded-full absolute -bottom-5"></div> */}
          <img
          className="w-[159px] h-[159px] rounded-full object-cover mb-4 absolute -bottom-10"
          src={profileImage}
          alt={`${name}'s profile`}
          />
        </div>
        <div className="bg-gray-100 h-[290px] p-3 pt-6">
              <div className="flex items-center justify-center mb-2">
              <h2 className="text-[25px] font-bold text-gray-800">{name}</h2>
        {isAdmin && (
          <FaUserShield className="text-yellow-600 ml-2" title="Admin" size={20} />
        )}
      </div>
          <p className="text-[20px] p-1.5">{year}</p>
          <p className="text-[20px] p-1.5">Domain: {domain}</p>
          <p className="text-[20px] p-1.5">Skills: {expertIn.join(', ')}</p>
          <div className="p-4">
            <button className="bg-blue-500 text-[20px] rounded-[12px] text-white py-2 px-4  hover:bg-blue-700 w-[195px] h-[46px]">
              View Profile
            </button>
          </div>
        </div>
      </div>
    );
  };

export default MemberCard;
