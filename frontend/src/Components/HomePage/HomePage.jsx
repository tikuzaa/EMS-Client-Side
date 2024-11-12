import React, { useState } from 'react';
import MemberCard from '../MemberCard/Member Card.jsx'; // Adjust the path if necessary

const HomePage = ({ members, role }) => {
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter members based on domain and search query
  const filteredMembers = members
    .filter(member => selectedDomain === 'All' || member.domain === selectedDomain)
    .filter(member => member.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Get unique domains for tabs
  const domains = ['All', ...new Set(members.map(member => member.domain))];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome {role === 'admin' ? 'Admin' : 'Member'} Home
      </h1>

      {/* Domain Tabs */}
      <div className="mb-4">
        <ul className="flex space-x-4">
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
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Search member by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Member Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
