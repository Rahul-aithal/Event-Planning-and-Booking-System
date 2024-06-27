import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

function Events_List() {
    const [bookedData, setBookedData] = useState([]); // Initial state is null
    const isFetched = useRef(false)
    useEffect(() => {
        if (isFetched.current) return;
        isFetched.current = true;

        axios.get("http://localhost:8000/api/v1/booking/booker-details", {
            withCredentials: true
        }).then((res) => {
            console.log("res_datas", res.data.data, typeof (res.data.data));
            const fetchedData = res.data.data


            if (Array.isArray(fetchedData[0].bookedEvents)) {
                setBookedData(fetchedData[0].bookedEvents); // Set bookedData directly to the array
            } else {

                console.error("bookedEvents is not an array");
            }
        }
        )
            .catch(error => console.log(error))


    }, []);



    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <h2 className="fw-bold py-2 px-3 mb-4">
                        All of your booked events are shown below
                    </h2>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col">
                    <section id="events-list">
                        {bookedData.length > 0 &&
                            <div className="row">
                                {bookedData.map((event) => (
                                    <div key={event._id} className="col-sm-6 mb-4">
                                        <div className="card">

                                            <div className="card-header text-center bg-success text-white fw-bold">
                                                {event.eventDetails.eventName}
                                            </div>
                                            <div className="card-body">
                                                <p className="card-text">{event.eventDetails.description}</p>
                                                <p className="card-text">Date: {event.eventDetails.date}</p>
                                                <p className="card-text">Location: {event.eventDetails.location}</p>
                                                <p className="card-text">Made By: {event.eventDetails.owner}</p>
                                                <p className="card-text">Available Seats: {event.eventDetails.availableSeats}</p>
                                                <button href="#" className="btn btn-success">Booked</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Events_List;
