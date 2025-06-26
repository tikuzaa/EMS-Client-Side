import React, { useState, useEffect } from "react";
import API from "../Utils/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EventComponent = ({ eventsData, membersData }) => {
  const [events, setEvents] = useState(eventsData); // Using imported events data
  const [members, setMembers] = useState(membersData);
  const [orgTeam, setOrgTeam] = useState([{ memberId: 0, assignment: "" }]);
  const [eventDetails, setEventDetails] = useState({
    date: "",
    location: "",
    organizingTeam: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const roles = ["Event, manager", "Coordinatior", "Tech Support"];

  useEffect(() => {
    fetchEvents();
    fetchMembers();

    
  }, []);

  // close funtion to close modal on screen clicking
  const close = () => {
    setIsModalOpen(false);
  };

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const response = await API.get("/api/events");
      setEvents(response.data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch all members
  
  const fetchMembers = async () => {
    try {
      const response = await API.get("/api/members");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  // Handle new event addition
  const handleAddEvent = () => {
    setIsModalOpen(true);
    setEventDetails({
      name: "",
      date: "",
      time: "",
      location: "",
      organizingTeam: [],
    });
  };

  const handleTeamMemberAssign = (memberId, assignment) => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      organizingTeam: [
        ...prevDetails.organizingTeam.filter((m) => m !== memberId),
        { memberId, assignment },
      ],
    }));
  };

  // Save the event to the backend
  const handleSaveEvent = async () => {
    const updated = { ...eventDetails, organizingTeam: orgTeam };
    setEventDetails(updated);
    try {
      const response = await API.post("/api/events", updated);
      setEvents([...events, response.data]); // Update local state
      setIsModalOpen(false);
      toast.success("Your event was added!");
    } catch (error) {
      console.error("Error saving event:", error);

    }
  };

  // Filter upcoming and past events
  const today = new Date().toISOString().split("T")[0];
  const getUpcomingEvents = () => events.filter((event) => event.date >= today);
  const getPastEvents = () => events.filter((event) => event.date < today);

const getMemberNameById = (id) => {
  const member = members.find((m) => m._id === id);
  return member ? member.username : "Unknown Member";
};

  // handleChange for member and role selection
  const handleChange = (index, field, value) => {
    let updated = [...orgTeam];
    updated[index][field] = value;
    setOrgTeam(updated);
  };

  //handleAddMember for adding select option for new member in modal
  const handleAddMember = () => {
    setOrgTeam([...orgTeam, { memberId: 0, assignment: "" }]);
  };

  const handleDelelteSelect = (i) => {
    setOrgTeam((prev) => prev.filter((_, index) => index !== i));
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
    
      {/*Upcoming Events Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
         <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getUpcomingEvents().map((event) => (
            <div key={event.id} className="bg-gray-50 p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">Event: {event.name}</h2>
              <h3 className="text-lg font-semibold">Date: {event.date}</h3>
              <p>location: {event.location}</p>
              <h4 className="mt-2 font-semibold">Organizing Team:</h4>
              <ul>
                {event.organizingTeam.map((member) => (
                  <li key={member.memberId}>
                    {getMemberNameById(member.memberId._id)} - {member.assignment}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button
          className="mt-6 bg-green-500 text-white py-2 px-4 rounded"
          onClick={handleAddEvent}
        >
          Create New Event
        </button>
      </section>

      {/* Past Events Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Past Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getPastEvents().map((event) => (
            <div key={event.id} className="bg-gray-50 p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Event: {event.name}</h2>
              <h3 className="text-lg font-semibold">
                Date: {event.date.slice(0, 10)}
              </h3>
              <p>location: {event.location}</p>
              <h4 className="mt-2 font-semibold">Organizing Team:</h4>
              <ul>
                {event.organizingTeam.map((member) => (
                  <li key={member}>
                    {getMemberNameById(member.memberId._id)} -{" "}
                    {member.assignment}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Add Event Modal */}
      {isModalOpen && (
        <div
          onClick={close}
          className="fixed inset-0 flex justify-center items-start overflow-y-auto bg-gray-900 bg-opacity-50 z-50 pt-16 pb-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-full  max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Create New Event</h2>
            <div className="mb-4">
              <label className="block mb-2">Event:</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={eventDetails.name}
                onChange={(e) =>
                  setEventDetails({ ...eventDetails, name: e.target.value })
                }
                placeholder="Enter Name"
              />
              <label className="block mb-2">Date</label>
              <input
                type="date"
                className="border p-2 w-full"
                value={eventDetails.date}
                onChange={(e) =>
                  setEventDetails({ ...eventDetails, date: e.target.value })
                }
              />
              <label className="block mt-4 mb-2">Time</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={eventDetails.time}
                onChange={(e) =>
                  setEventDetails({ ...eventDetails, time: e.target.value })
                }
                placeholder="Enter event time (e.g., 10:00 AM - 11:00 AM)"
              />
              <label className="block mt-4 mb-2">location</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={eventDetails.location}
                onChange={(e) =>
                  setEventDetails({ ...eventDetails, location: e.target.value })
                }
                placeholder="Enter location"
              />
              <label className="block mt-4 mb-2">Organizing Team</label>
              {orgTeam.map((item, index) => {
                return (
                  <div key={index} className="w-full h-auto flex gap-2">
                    {/* member selection */}
                    <select
                      value={item.memberId}
                      onChange={(e) =>
                        handleChange(index, "memberId", e.target.value)
                      }
                      className="border p-2 rounded w-full mb-2"
                    >
                      <option value="">Select member</option>
                      {members.map((m, i) => (
                        <option key={i} value={m._id}>
                          {m.username}
                        </option>
                      ))}
                    </select>

                    {/* role selection */}
                    <select
                      value={item.role}
                      onChange={(e) =>
                        handleChange(index, "assignment", e.target.value)
                      }
                      className="border p-2 rounded w-full mb-2"
                    >
                      <option value="">Select role</option>
                      {roles.map((role, i) => (
                        <option key={i} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleDelelteSelect(index)}
                      className="text-red-700"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
              <button onClick={handleAddMember}>
                <div>
                  <h1>+ add member</h1>
                </div>
              </button>
            </div>

            {/* Save Button */}
            <button
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
              onClick={handleSaveEvent}
            >
              Save Event
            </button>
          </div>
        </div>
      )}
    <ToastContainer position="top-right" />  
    </div>
  );
};

export default EventComponent;
