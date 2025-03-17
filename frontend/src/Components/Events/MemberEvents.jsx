import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import API from "../Utils/axiosConfig"; 

const MemberEvents = () => {
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchMembers();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await API.get("/api/events");
      setEvents(response.data.data);
      console.log("Events fetched successfully:", response.data.data);
      
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await API.get("/api/members");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const today = new Date().setHours(0, 0, 0, 0);
  
  const getUpcomingEvents = () => {
    return Array.isArray(events) ? events.filter(
      (event) => new Date(event.date).setHours(0, 0, 0, 0) >= today
    ) : [];
  };

  const getPastEvents = () => {
    return Array.isArray(events) ? events.filter(
      (event) => new Date(event.date).setHours(0, 0, 0, 0) < today
    ) : [];
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        {getUpcomingEvents().map((event) => (
          <EventCard key={event._id} event={event} isUpcoming={true} membersData={members} />
        ))}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Past Events</h2>
        {getPastEvents().map((event) => (
          <EventCard key={event._id} event={event} isUpcoming={false} membersData={members} />
        ))}
      </div>
    </div>
  );
};

export default MemberEvents;
