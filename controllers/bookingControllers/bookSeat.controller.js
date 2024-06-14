import { handleResponse } from "../../utils/HnadleResponse.js";
import { Event } from "../../models/event.model.js"
import { Booking } from "../../models/booking.model.js";



export const bookSeat = async (req, res, next) => {
    const user = req.user;
    const { owner,title, date, location,bookedSeats } = req.body;
    const eventDetails = { title, date, location }
    if (!(user && eventDetails)) return handleResponse(res, 404, {}, new Error("Data missing"), next);
    try {
        const event = await Event.findOne({
            "owner.username":owner,
            title,
            date,
            location,
        });
        console.log( { owner,title, date, location,bookedSeats ,event} );
        if (!event) return handleResponse(res, 404, {}, new Error("No evnent present"), next);

        const booking = new Booking();
        booking.eventName = event._id;
        booking.owner = event.owner._id;
        booking.booker = user._id;

        await booking.save();
      
        
        // Update the booked seats in the event
        event.bookedSeats += bookedSeats||1;
        event.availableSeats -=bookedSeats||1;
        await event.save();
        return handleResponse(res, 200, booking,null, next);
    }
 catch (error) {
    return handleResponse(res, 500, "Server Error", error, next);
}
}