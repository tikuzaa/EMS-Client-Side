import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import API from "../Utils/axiosConfig"; 

const MemberEvents = () => {
  const [events, setEvents] = useState([]); // Ensure events is initialized as an array
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchMembers();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await API.get("/api/events");

      // Ensure the response contains an array
      if (Array.isArray(response.data.data)) {
        setEvents(response.data.data); // Extract events array correctly
      } else {
        console.error("Unexpected API response format:", response.data);
        setEvents([]); //Ensure events is always an array
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]); // Prevent filter() errors
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await API.get("/api/members");
      
      // Ensure response is an array
      if (Array.isArray(response.data.data)) {
        setMembers(response.data.data);
      } else {
        console.error("Unexpected API response format:", response.data);
        setMembers([]);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      setMembers([]);
    }
  };

  const today = new Date().setHours(0, 0, 0, 0);

  //Add check to prevent filter() errors
  const getUpcomingEvents = () => {
    return Array.isArray(events)
      ? events.filter((event) => new Date(event.date).setHours(0, 0, 0, 0) >= today)
      : [];
  };

  const getPastEvents = () => {
    return Array.isArray(events)
      ? events.filter((event) => new Date(event.date).setHours(0, 0, 0, 0) < today)
      : [];
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        {getUpcomingEvents().length > 0 ? (
          getUpcomingEvents().map((event) => (
            <EventCard key={event._id} event={event} isUpcoming={true} membersData={members} />
          ))
        ) : (
          <p className="text-gray-500">No upcoming events.</p>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Past Events</h2>
        {getPastEvents().length > 0 ? (
          getPastEvents().map((event) => (
            <EventCard key={event._id} event={event} isUpcoming={false} membersData={members} />
          ))
        ) : (
          <p className="text-gray-500">No past events.</p>
        )}
      </div>
    </div>
  );
};

export default MemberEvents;
