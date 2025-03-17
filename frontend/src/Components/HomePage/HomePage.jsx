import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MemberCard from "../MemberCard/Member Card.jsx";
import API from "../Utils/axiosConfig"; // Axios global instance

const HomePage = () => {
  const location = useLocation();
  const storedUserData = (() => {
    try {
      const userData = JSON.parse(localStorage.getItem("memberData"));
      return userData || {};
    } catch (error) {
      console.error("Error parsing userData from localStorage:", error);
      return {}; // Return an empty object if parsing fails
    }
  })();

  const userData = location.state?.userData || storedUserData;
  

  const [members, setMembers] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all members from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await API.get("api/members"); // Fetch all members
        console.log("Fetched Members:", response.data);
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  // Filter the logged-in user from the members list
  const loggedInMember = members.find(member => member.email === userData.email);

  // Filter members based on domain and search query
  const filteredMembers = members
  .filter(member => 
    selectedDomain === "All" || 
    (Array.isArray(member.domain) && member.domain.some(d => d.trim().toLowerCase() === selectedDomain))
  )
  .filter(member => member.username?.toLowerCase().includes(searchQuery.toLowerCase()));



  // Get unique domains for filtering
  const domains = ["All", ...new Set(
    members.map(member => 
      Array.isArray(member.domain) && member.domain.length > 0
        ? member.domain[0].trim().toLowerCase() // Extract first domain and normalize
        : "unknown" // Fallback for missing domains
    )
  )];


  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="name px-4">
        {storedUserData ? (
          <h1>Welcome {storedUserData}</h1>
        ) : (
          <h1>Welcome Guest</h1>
        )}
      </div>
      
      {/* Domain Tabs */}
      <div className="mb-4">
        <ul className="flex space-x-4">
          {domains.map(domain => (
            <li key={domain}>
              <button
                className={`px-4 py-2 rounded-md ${selectedDomain === domain ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
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
