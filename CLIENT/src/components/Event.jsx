import React from 'react';
import Button from './Button';
import { useSelector } from 'react-redux';

const Event = ({ children, eventData, bgcolor = 'bg-primary', booked = true }) => {
  const dark=useSelector(state=>state.themeChanger.dark) 
  return (
    <div className="col mb-4 shadow-lg">
      <div className="card shadow-sm">
        <div className={`card-header ${bgcolor} text-white fw-bold text-center`}>
          {eventData.title}
        </div>
        <div className="card-body ">
          <p className={`card-text p-2 fw-bold   ${dark?"text-warning":"text-primary" }`}>
            {eventData.description}
          </p>
          <p className="card-text "><i className="bi bi-pin-map me-2 "></i>Location: {eventData.location}</p>
          <p className="card-text"><i className="me-2 bi bi-calendar-plus-fill"></i>Date: {eventData.date}</p>
          <p className="card-text">Created By: {eventData.owner.username ? eventData.owner.username : eventData.owner}</p>
          <p className="card-text">Available Seats: {eventData.availableSeats}</p>
          {booked && <Button btnBgtype="btn-success " classNames="fw-bold  ">Booked</Button>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Event;