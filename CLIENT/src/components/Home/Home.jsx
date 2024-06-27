import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import "./home.css"
function Home() {
    const [events, setEvents] = useState([]);
    const [seats, setSeats] = useState(1);
    const [bookNow, setBookNow] = useState(false);
    const isCalled = useRef(false);

    useEffect(() => {
        if (isCalled.current) return;
        isCalled.current = true;
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/v1/events/all-events",
                    {
                        withCredentials: true  // Include credentials in cross-origin requests
                    }
                );
                // console.log(response.data.data);
                setEvents(response.data.data);
            } catch (error) {
                isCalled.current = false;
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

const handlefirstClick=()=>{
    setBookNow(!bookNow)
}

//http://localhost:8000/api/v1/booking/book-event
    const bookEventNow=(event)=>{
        const data={}
        console.log(event);
        // axios.post("http://localhost:8000/api/v1/booking/book-event",{},{withCredentials:true})
        setBookNow(!bookNow)
    }

    return (
        <div className="container mt-5 overflow-y-scroll innerScrollBar" style={{height:"90vh",width:"100vw"}}>
            <section id="booked-events">
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
            </section>

            <section id="available-events">
                <h2 className="text-warning-custom fw-bold py-2 px-3 mb-4">
                    All the events available for bookings are shown below
                </h2>
                {events.map((event) => (
                    <div key={event._id} className="row">
                        <div className="col-sm-6 mb-4">
                            <div className="card">
                                <div className="card-header text-center bg-primary text-white fw-bold">
                                    Title of Available {event._id}
                                </div>
                                <div className="card-body">
                                    <p className="card-text text-bg-warning p-2 text-danger-emphasis fw-bold">
                                        Description {event.description}
                                    </p>
                                    <p className="card-text">Location {event.location}</p>
                                    <p className="card-text">Date {event.date}</p>
                                    <p className="card-text">Available Seats {event.availableSeats}</p>
                                    
                                    <p className="card-text">Owner {event.owner.username}</p>

                                  {  bookNow ?   (<div>
                                            <input type='text' className='form-control form-text' value={seats} placeholder='Enter the seats' onChange={(e)=>(setSeats(e.targe.value))} />
                                            <button onClick={() => bookEventNow(event)} className="btn btn-danger mt-2">Confirm Booking</button>
                                        </div>)
                                     :<button onClick={handlefirstClick} className="btn btn-danger">Book Now</button>}


                                  
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Home;
