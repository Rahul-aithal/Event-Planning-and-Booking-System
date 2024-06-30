import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Event from '../../components/Event';
import Container from '../../components/container/Container';
import { useSelector } from 'react-redux';

function Events_List() {
  const [bookedData, setBookedData] = useState([]);
  const isFetched = useRef(false);
  const dark = useSelector(state=>state.themeChanger.dark)

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    axios.get("http://localhost:8000/api/v1/booking/booker-details", { withCredentials: true })
      .then((res) => {
        const fetchedData = res.data.data;

        if (Array.isArray(fetchedData[0].bookedEvents)) {
          setBookedData(fetchedData[0].bookedEvents);
        } else {
          console.error("bookedEvents is not an array");
        }
      }).catch(error => console.log(error));
  }, []);

  return (
    <Container>
      <div className={`container-fluid   ${dark?"bg-dark text-light" :"bg-light text-dark"}`}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-10 text-center">
            <h2 className="fw-bold py-2 px-3 mb-4">
              All of your booked events are shown below
            </h2>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {bookedData.length > 0 && (
            bookedData.map((event) => (
              <div key={event._id} className="col mb-4">
                <Event eventData={event.eventDetails} booked bgcolor="bg-success" />
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
}

export default Events_List;