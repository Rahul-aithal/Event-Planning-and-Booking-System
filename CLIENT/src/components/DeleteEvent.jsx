import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';

const DeleteEvent = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [startDate, setstartDate] = useState(new Date());

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

  const handleDateChange = (date) => {
    startDate(date);
    setValue("date", date); 
  };

  const Delete = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("http://localhost:8000/api/v1/events/delete-event", data, {
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
        <h2 className="mb-4 text-center" style={{ color: '#007bff' }}>Delete Event</h2>
        <form onSubmit={handleSubmit(Delete)}>
          <div className="mb-3">
            <Input
              label="Title"
              placeholder="Enter title of event"
              {...register("title", { required: true })}
            />
            {errors. Title && <span className="text-danger">Title is required</span>}
          </div>

          <div className="mb-3">
            <label htmlFor=" Date" className="form-label">  Event Date</label>
            <br />
            <DatePicker
              showIcon
              calendarContainer={MyContainer}
              toggleCalendarOnIconClick
              selected={startDate} 
              onChange={handleDateChange}
              className={`form-control ${dark ? "dark-theme-datepicker" : ''}`}
              placeholderText="Enter   date of Event"
              dateFormat="dd/MM/yyyy"
              id=" Date"
              withPortal
              portalId="root-portal"
              showMonthDropdown
              showYearDropdown
              showPreviousMonths
            />
            {errors.Date && <span className="text-danger">  Date is required</span>}
          </div>
          <div className="mb-3">
            <Input
              label="Location"
              placeholder="Enter location of Event"
              {...register("location", { required: true })}
            />
            {errors.location && <span className="text-danger">Location is required</span>}
          </div>

          <div className="d-grid">
            <Button type="submit" className="btn btn-primary">Delete Event</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteEvent;
