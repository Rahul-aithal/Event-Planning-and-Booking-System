import { Booking } from "../../models/booking.model.js";
import { Event } from "../../models/event.model.js";
import { handleResponse } from "../../utils/HnadleResponse.js";


export const unbookSeat = async (req, res, next) => {
    const user = req.user;

    const { owner, title, location, date, unbookingseats } = req.body;
    
    try {
        const event = await Event.findOne({
            "owner.username": owner,
            title,
            location,
            date
        });

        if (!event) {
            return handleResponse(res, 404, null, new Error("Event not found"), next);
        }


        const bookedEvents = await Booking.find({
            booker: user._id,
            eventName: event._id
        }).limit(unbookingseats);

        if (bookedEvents.length === 0) return handleResponse(res, 404, null, new Error("No bookings done for this event by this user"), next);

        const deletedEvent = await Booking.deleteMany(
            {
                _id: { $in: bookedEvents.map(bookings => bookings._id) }
            });
            Number(unbookingseats);
         

        event.availableSeats = Number(event.availableSeats)-deletedEvent.deletedCount;
        event.bookedSeats -= deletedEvent.deletedCount;
        await event.save();

        return handleResponse(res, 200, deletedEvent, null, next);


    } catch (error) {
        return handleResponse(res, 500, null, error, next);
    }

}