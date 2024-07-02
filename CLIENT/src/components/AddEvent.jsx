import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import './ReactDatePicker.css';

const AddEvent = () => {
  const { register, handleSubmit, setValue ,formState: { errors }} = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const dark = useSelector(state => state.themeChanger.dark);

  const MyContainer = ({ className, children }) => (
    <div
      style={{
        padding: "16px",
        background: dark ? "#333" : "#216ba5",
        color: dark ? "#fff" : "#000", // Adjust text color as needed
      }}
    >
      <div className={className}>
        <div style={{ 
           position: "relative" }}>{children}</div>
      </div>
    </div>
  );

  const handleDateChange = (date) => {
    setStartDate(date);
    setValue("date", date); // Optionally update form value
  };

  const AddPost = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("http://localhost:8000/api/v1/events/add-event", data, {
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
        <h2 className="mb-4 text-center" style={{ color: '#007bff' }}>Add Event</h2>
        <form onSubmit={handleSubmit(AddPost)}>
          
        <div className="mb-3">
        <Input
              label="Title"
              placeholder="Enter title of event"
              {...register("title", { required: true })}
            />
            {errors.title && <span className="text-danger">Title is required</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              maxLength="50"
              className="form-control"
              id="description"
              placeholder="Enter description of Event"
              style={{ height: '100px', fontSize: '15px', resize: 'none' }}
              {...register("description", { required: true })}
            />
            {errors.description && <span className="text-danger">Description is required</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">Event Date</label>
            <br />
            <DatePicker
              showIcon
              calendarContainer={MyContainer}
              toggleCalendarOnIconClick
              selected={startDate}
              onChange={handleDateChange}
              className={`form-control ${dark ? "dark-theme-datepicker" : ''}`}
              placeholderText="Enter date of Event"
              dateFormat="dd/MM/yyyy"
              id="date"
              withPortal
              portalId="root-portal"
              showMonthDropdown
              showYearDropdown
              showPreviousMonths
            />
            {errors.date && <span className="text-danger">Date is required</span>}
          </div>

          <div className="mb-3">
            <Input
              label="Location"
              placeholder="Enter location of Event"
              {...register("location", { required: true })}
            />
            {errors.location && <span className="text-danger">Location is required</span>}
          </div>

          <div className="mb-3">
            <Input
              label="Available Seats"
              type="number"
              min="0"
              placeholder="Enter total available seats"
              {...register("availableSeats", { required: true })}
            />
            {errors.availableSeats && <span className="text-danger">Available Seats is required</span>}
          </div>

          <div className="d-grid">
            <Button type="submit" className="btn btn-primary">Add Event</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
