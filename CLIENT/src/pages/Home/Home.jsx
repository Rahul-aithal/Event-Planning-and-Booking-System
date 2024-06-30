import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import "./home.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/container/Container';

import Event from '../../components/Event';

function Home() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [events, setEvents] = useState([]);
  const [seats, setSeats] = useState(1);
  const [bookNow, setBookNow] = useState(false);
  const isCalled = useRef(false);
  const [calledEvent, setCalledEvent] = useState(null);
  const [invalidSeats, setInvalidSeats] = useState(false);

  const AllEvents = React.memo(() => (
    <section id="available-events">
      <h2 className="text-warning-custom fw-bold py-2 px-3 mb-4">
        All the events available for bookings are shown below
      </h2>
      {events.map((event) => (
        <React.Fragment key={event._id}>
          <Event eventData={event} booked={false}>
            {bookNow && calledEvent === event._id ? (
              <div>
                <input
                  type='text'
                  className='form-control form-text'
                  value={seats}
                  placeholder='Enter the seats'
                  name={event._id}
                  onChange={(e) => setSeats(e.target.value)}
                />
                {invalidSeats && (
                  <p className='fw-bold text-danger'>
                    *Enter valid number of seats
                  </p>
                )}
                <button onClick={() => bookEventNow(event)} className="btn btn-danger mt-2">
                  Confirm Booking
                </button>
              </div>
            ) : (
              <button
                onClick={() => authStatus ? handleFirstClick(event._id) : navigate("/SignUp")}
                className="btn btn-danger"
              >
                Book Now
              </button>
            )}
          </Event>
        </React.Fragment>
      ))}
    </section>
  ));

  useEffect(() => {
    if (isCalled.current) return;
    isCalled.current = true;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/events/all-events", {
          withCredentials: true,
        });

        setEvents(response.data.data);
      } catch (error) {
        isCalled.current = false;
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFirstClick = (eventId) => {
    setCalledEvent(eventId);
    setBookNow(!bookNow);
  };

  const bookEventNow = async (event) => {
    const data = {};
    const values = ["title", "location", "owner", "date"];

    values.forEach(value => {
      data[value] = event[value];
    });

    data.owner = data.owner.username;
    if (seats <= 0) {
      setInvalidSeats(true);
      return;
    }
    
    data.bookedSeats = seats;

    try {
      await axios.post("http://localhost:8000/api/v1/booking/book-event", data, { withCredentials: true });
      setBookNow(!bookNow);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>

      <div className="container  innerScrollBar" style={{ height: "90vh", width: "100vw" }}>
        {/* <section id="booked-events">
          <h2 className="fw-bold py-2 px-3 mb-4">
            All of your upcoming booked events shown below
          </h2>
          <div className="row">
            <div className="col-sm-6 mb-4">
              <div className="card">
                <div className="card-header text-center bg-success text-white fw-bold">
                  Title of Booked Event
                </div>
                <div className="card-body">
                  <p className="card-text">Booked Event Description</p>
                  <a href="#" className="btn btn-success">Booked</a>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <AllEvents />
      </div>
    </Container>
  );
}

export default Home;
