import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import Event from '../../components/Event';

function Events_List() {
  const [bookedData, setBookedData] = useState([]);
  const isFetched = useRef(false);
  const dark = useSelector(state => state.themeChanger.dark);
  const authStatus = useSelector(state => state.auth.status);

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    axios.get("http://localhost:8000/api/v1/booking/booker-details", { withCredentials: true })
      .then((res) => {
        const fetchedData = res.data.data;

        if (Array.isArray(fetchedData[0]?.bookedEvents)) {
          setBookedData(fetchedData[0].bookedEvents);
        } else {
          console.error("bookedEvents is not an array");
        }
      }).catch(error => console.log(error));
  }, []);

  return (
    <Container>
      <div className={`container-fluid ${dark ? "bg-dark text-light" : "bg-light text-dark"} rounded p-3`}>

        <div className="row justify-content-center">
          <div className="col-md-8 col-10 text-center">
            <h2 className={`fw-bold py-2 mb-4`}>
              All of your booked events are shown below
            </h2>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 g-4">
          {bookedData.length > 0 ? (
            bookedData.map(event => (
              <div key={event._id} className="col mb-4">
                <Card className={`card ${dark ? "bg-dark text-light" : "bg-light text-dark"} border rounded shadow-sm`} style={{ width: '18rem' }}>
                  <Card.Body className="p-3">
                    <Event eventData={event.eventDetails} booked bgcolor="bg-success" />
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <div className="col text-center">
              <p>No events booked yet.</p>
            </div>
          )}
        </div>

        
      </div>
    </Container>
  );
}

export default Events_List;
