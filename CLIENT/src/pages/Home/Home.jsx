import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './Scrollbar.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/container/Container';
import Event from '../../components/Event';

function Home() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [events, setEvents] = useState([]);
  const [seats, setSeats] = useState(1);
  const [bookNow, setBookNow] = useState(Boolean);
  const isCalled = useRef(false);
  const [calledEvent, setCalledEvent] = useState(null);
  const [invalidSeats, setInvalidSeats] = useState(false);

  const AllEvents = React.memo(() => (
    <section id="available-events">
      <h2 className="text-warning-custom fw-bold py-2 px-3 mb-4">
        All the events available for bookings are shown below
      </h2>
      <div className="row">
        {events.map((event) => (
          <div key={event._id} className="col-md-6 col-lg-4 mb-4">
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
                  <button onClick={() => setBookNow(false)} className="btn btn-danger bg-danger-subtle mt-2 mx-5">
                    Cancel Booking
                  </button>
                  <button onClick={() => bookEventNow(event)} className="btn btn-success mt-2">
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
          </div>
        ))}
      </div>
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
  }, [isCalled.current]);

  const handleFirstClick = (eventId) => {
    setCalledEvent(eventId);
    setBookNow(true);
  };

  const bookEventNow = async (event) => {
    const data = {};
    const values = ["title", "location", "owner", "date"];
    console.log(event);
    
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

      const res= await axios.post("http://localhost:8000/api/v1/booking/book-event", data, { withCredentials: true });
      isCalled.current=false
      setBookNow(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="container-fluid innerScrollBar" style={{ minHeight: "90vh", width: "100%" }}>
        <AllEvents />
      </div>
    </Container>
  );
}

export default Home;



