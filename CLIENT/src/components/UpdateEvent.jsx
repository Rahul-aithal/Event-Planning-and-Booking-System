import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';

const EditEvent = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [startNewDate, setstartNewDate] = useState(new Date());
  const [oldStartDate, setOldStartDate] = useState(new Date());
  const dark = useSelector(state => state.themeChanger.dark);

  const MyContainer = ({ className, children }) => (
    <div
      style={{
        padding: "16px",
        background: dark ? "#333" : "#216ba5",
        color: dark ? "#fff" : "#000",
      }}
    >
      <div className={className}>
        <div style={{ position: "relative" }}>{children}</div>
      </div>
    </div>
  );

  const handleNewDateChange = (date) => {
    setstartNewDate(date);
    setValue("date", date); 
  };

  const Edit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("http://localhost:8000/api/v1/events/update-event", data, {
        withCredentials: true,
      });
      console.log(res);
      if (res.status === 201 && res.data.success) {
        console.log("Success");
      } else if (res.status === 401 && !res.data.data) {
        console.log("Login issue");
      } else if (res.status === 400) {
        console.log("Fields empty");
      } else if (res.status === 401 && res.data.data) {
        console.log("Event already exists");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4 text-center" style={{ color: '#007bff' }}>Update Event</h2>
        <form onSubmit={handleSubmit(Edit)}>
          <div className="mb-3">
            <Input
              label="Current Title"
              placeholder="Enter current title of event"
              {...register("currentTitle", { required: true })}
            />
            {errors.currentTitle && <span className="text-danger">Title is required</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="currentDate" className="form-label">Current Event Date</label>
            <br />
            <DatePicker
              showIcon
              calendarContainer={MyContainer}
              toggleCalendarOnIconClick
              selected={oldStartDate} 
              onChange={(date) => {
                setOldStartDate(date);
                setValue("currentDate", date); 
              }}
              className={`form-control ${dark ? "dark-theme-datepicker" : ''}`}
              placeholderText="Enter current date of Event"
              dateFormat="dd/MM/yyyy"
              id="currentDate"
              withPortal
              portalId="root-portal"
              showMonthDropdown
              showYearDropdown
              showPreviousMonths
            />
            {errors.currentDate && <span className="text-danger">Current Date is required</span>}
          </div>

          <div className="mb-3">
            <Input
              label="Current Location"
              placeholder="Enter current location of Event"
              {...register("currentLocation", { required: true })}
            />
            {errors.currentLocation && <span className="text-danger">Location is required</span>}
          </div>

          <div className="mb-3">
            <Input
              label="New Title"
              placeholder="Enter new title of event (optional)"
              {...register("title")}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="newDescription" className="form-label">New Description</label>
            <textarea
              maxLength="50"
              className="form-control"
              id="newDescription"
              placeholder="Enter new description of Event (optional)"
              style={{ height: '100px', fontSize: '15px', resize: 'none' }}
              {...register("description")}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="newDate" className="form-label">New Event Date</label>
            <br />
            <DatePicker
              showIcon
              calendarContainer={MyContainer}
              toggleCalendarOnIconClick
              selected={startNewDate}
              onChange={handleNewDateChange}
              className={`form-control ${dark ? "dark-theme-datepicker" : ''}`}
              placeholderText="Enter new date of Event (optional)"
              dateFormat="dd/MM/yyyy"
              id="newDate"
              withPortal
              portalId="root-portal"
              showMonthDropdown
              showYearDropdown
              showPreviousMonths
            />
          </div>

          <div className="mb-3">
            <Input
              label="New Location"
              placeholder="Enter new location of Event (optional)"
              {...register("location")}
            />
          </div>

          <div className="mb-3">
            <Input
              label="New Available Seats"
              type="number"
              min="0"
              placeholder="Enter new total available seats (optional)"
              {...register("availableSeats")}
            />
          </div>

          <div className="d-grid">
            <Button type="submit" className="btn btn-primary">Update Event</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
