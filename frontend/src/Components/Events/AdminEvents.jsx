import React, { useState, useEffect } from "react";
import API from "../Utils/axiosConfig";

const EventComponent = () => {
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [eventDetails, setEventDetails] = useState({
    name: "",
    date: "",
    location: "",
    time: "",
    organizingTeam: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
    fetchMembers();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await API.get("/api/events");
      if (response.data.success) {
        setEvents(response.data.data);
      } else {
        console.error("Error fetching events:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await API.get("/api/members");
      if (response.data.success) {
        setMembers(response.data.data);
      } else {
        console.error("Error fetching members:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleAddEvent = () => {
    setIsModalOpen(true);
    setEventDetails({
      name: "",
      date: "",
      location: "",
      time: "",
      organizingTeam: [],
    });
  };

  const handleTeamMemberAssign = (member, assignment) => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      organizingTeam: [
        ...prevDetails.organizingTeam.filter((m) => m.memberId !== member._id),
        { memberId: member._id, assignment },
      ],
    }));
  };

  const handleSaveEvent = async () => {
    try {
      const response = await API.post("/api/events", eventDetails);
      if (response.data.success) {
        setEvents([...events, response.data.data]);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const getUpcomingEvents = () => events.filter((event) => event.date >= today);
  const getPastEvents = () => events.filter((event) => event.date < today);

  const getMemberNameById = (id) => {
    const member = members.find((m) => m._id === id);
    return member ? member.name : "Unknown Member";
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getUpcomingEvents().map((event) => (
            <div key={event._id} className="bg-gray-50 p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Event: {event.name}</h2>
              <h3 className="text-lg font-semibold">Date: {event.date}</h3>
              <p>Location: {event.location}</p>
              <h4 className="mt-2 font-semibold">Organizing Team:</h4>
              <ul>
                {event.organizingTeam.map((member) => (
                  <li key={member.memberId}>
                    {getMemberNameById(member.memberId)} - {member.assignment}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button className="mt-6 bg-green-500 text-white py-2 px-4 rounded" onClick={handleAddEvent}>
          Create New Event
        </button>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Event</h2>
            <div className="mb-4">
              <label className="block mb-2">Event Name</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={eventDetails.name}
                onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
                placeholder="Enter Name"
              />
              <label className="block mt-4 mb-2">Date</label>
              <input
                type="date"
                className="border p-2 w-full"
                value={eventDetails.date}
                onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })}
              />
              <label className="block mt-4 mb-2">Location</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={eventDetails.location}
                onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })}
                placeholder="Enter Location"
              />
              <label className="block mt-4 mb-2">Time</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={eventDetails.time}
                onChange={(e) => setEventDetails({ ...eventDetails, time: e.target.value })}
                placeholder="Enter Time (e.g., 10 AM - 12 PM)"
              />
            </div>
            <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded" onClick={handleSaveEvent}>
              Save Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventComponent;
