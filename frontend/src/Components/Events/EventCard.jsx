import React from 'react';
import { FaRegClock } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";

const EventCard = ({ event, isUpcoming, membersData }) => {
  const cardStyle = isUpcoming ? 'bg-green-200' : 'bg-gray-300';

  return (
    <div className={`flex flex-col p-4 mb-4 rounded-lg ${cardStyle}`}>
      
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">{event.date}</div>
      </div>
      <div className="text-xl font-bold">{event.name}</div>
      <div className="flex items-center mt-2 space-x-2">
        <div className="flex items-center bg-red-400 text-black font-semibold px-4 py-2 rounded-full space-x-1">
          <span><FaRegClock size={16}/></span>
          <span>{event.time}</span>
        </div>
        <div className="flex items-center bg-violet-400 text-black font-semibold px-4 py-2 rounded-full space-x-1">
          <span><FaLocationDot size={15}/></span>
          <span>{event.location}</span>
        </div>
      </div>
      <div className="flex flex-col mt-2 text-lg">
        <span className="font-semibold">Organizing Team:</span>
        <ul className="list-disc ml-6">
          {event.organizingTeam.map((member) => {
            const memberData = membersData.find(data => data.id === member.memberId);
            return (
              <li key={member.memberId}>
                {member.assignment}: {memberData ? memberData.name : "Member not found"}
              </li>
            );
          })}
        </ul>
        <span>{event.team}</span>
      </div>
    </div>
  );
};

export default EventCard;
