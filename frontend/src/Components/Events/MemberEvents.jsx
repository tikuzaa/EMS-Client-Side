import React, { useState } from 'react';
import EventCard from './EventCard';


const MemberEvents = ({eventsData, membersData}) => {

  const [events] = useState(eventsData);

  const getUpcomingEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.date >= today);
  };
  
  const getPastEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.date < today);
  };

  return (
    <div className="p-8">
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      {getUpcomingEvents().map((event) => (
          <EventCard key={event.id} event={event} isUpcoming={true} membersData= {membersData}/>
        ))}
    </div>
    <div>
      <h2 className="text-2xl font-bold mb-4">Past Events</h2>
      {getPastEvents().map((event) => (
          <EventCard key={event.id} event={event} isUpcoming={false} membersData= {membersData}/>
        ))}
    </div>
  </div>
  );
};

export default MemberEvents;