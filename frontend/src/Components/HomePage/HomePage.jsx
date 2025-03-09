import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MemberCard from '../MemberCard/Member Card.jsx'; 

const HomePage = ({ members, role }) => {
  const location = useLocation();
  const userData = location.state?.userData || {};
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter members based on domain and search query
  const filteredMembers = members
    .filter(member => selectedDomain === 'All' || member.domain === selectedDomain)
    .filter(member => member.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Get unique domains for tabs
  const domains = ['All', ...new Set(members.map(member => member.domain))];

  // For debugging
  console.log('userData:', userData);
  return (
    <div className="max-w-7xl overflow-x-hidden  mx-auto p-4  relative z-0"> {/* Added relative z-0 to avoid overlap */}
      {userData.name ? (
        <h1>Welcome {userData.name}</h1>
      ) : (
        <h1>Welcome Guest</h1>
      )}

      {/* Domain Tabs */}
      <div className="mb-4">
        <ul className="flex space-x-4 justify-around px-5">
          {domains.map(domain => (
            <li key={domain}>
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedDomain === domain
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setSelectedDomain(domain)}
              >
                {domain}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Search Bar */}
      <div className="mb-4 px-5">
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Search member by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Member Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center lg:grid-cols-3 gap-6 py-5">
        {filteredMembers.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
