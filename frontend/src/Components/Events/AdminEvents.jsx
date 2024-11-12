import React, { useState } from 'react';

const EventComponent = ({eventsData, membersData}) => {
  const [events, setEvents] = useState(eventsData); // Using imported events data
  const [eventDetails, setEventDetails] = useState({
    date: '',
    venue: '',
    organizingTeam: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddEvent = () => {
    setIsModalOpen(true);
    setEventDetails({
        name: '',
      date: '',
      venue: '',
      organizingTeam: [],
    });
  };

  const handleTeamMemberAssign = (member, assignment) => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      organizingTeam: [
        ...prevDetails.organizingTeam.filter((m) => m.memberId !== member.id),
        { memberId: member.id, assignment },
      ],
    }));
  };

  const handleSaveEvent = () => {
    const newEvent = {
      ...eventDetails,
      id: events.length + 1,
    };
    setEvents([...events, newEvent]);
    setIsModalOpen(false);
  };

  const getUpcomingEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.date >= today);
  };

  const getPastEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.date < today);
  };

  const getMemberNameById = (id) => {
    const member = membersData.find((m) => m.id === id);
    return member ? member.name : 'Unknown Member';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Upcoming Events Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getUpcomingEvents().map((event) => (
            <div key={event.id} className="bg-gray-50 p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">Event: {event.name}</h2>
              <h3 className="text-lg font-semibold">Date: {event.date}</h3>
              <p>Venue: {event.venue}</p>
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
              <h3 className="text-lg font-semibold">Date: {event.date}</h3>
              <p>Venue: {event.venue}</p>
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
      </section>

      {/* Add Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
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
              <label className="block mt-4 mb-2">Venue</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={eventDetails.venue}
                onChange={(e) =>
                  setEventDetails({ ...eventDetails, venue: e.target.value })
                }
                placeholder="Enter venue"
              />
              <label className="block mt-4 mb-2">Organizing Team</label>
              <ul className="space-y-4">
                {membersData.map((member) => (
                  <li key={member.id}>
                    <label>
                      <select
                        className="border p-1 rounded"
                        onChange={(e) => handleTeamMemberAssign(member, e.target.value)}
                        defaultValue="None"
                      >
                        <option value="None">Select Assignment</option>
                        <option value="Event Manager">Event Manager</option>
                        <option value="Coordinator">Coordinator</option>
                        <option value="Tech Support">Tech Support</option>
                      </select>
                      {' '}{member.name}
                    </label>
                  </li>
                ))}
              </ul>
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
    </div>
  );
};

export default EventComponent;
