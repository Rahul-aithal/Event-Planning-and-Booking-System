import { Event } from "../../models/event.model.js";
import { handleResponse } from "../../utils/HandleResponse.js";

export const createEvent = async (req, res, next) => {
    const user = req.user;
    if (!user) return handleResponse(res, 401,null, new Error("No User Found"), next);

    const { title, description, date, location, availableSeats } = req.body;

    if (!(title && description && date && location && availableSeats))
        return handleResponse(res, 400,null, new Error("All fields are Complsory"), next);

    try {
        const isExisistingEvent = await Event.findOne({
            "owner._id": user._id,
            title,
            date,
            location
        })
        if (isExisistingEvent)
            return handleResponse(res, 401, isExisistingEvent, new Error("Event already present give anthore title"), next);
        const event = await Event.create({
            owner: {
                id: user._id,
                email: user.email,
                username: user.username
            },
            title,
            description,
            date,
            location,
            availableSeats,
            bookedSeats:0
        });
        return handleResponse(res, 201, event,null, next);
    } catch (error) {
        return handleResponse(res, 500,null, error, next);
    }
}


export const deleteEvent = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) return handleResponse(res, 401,null, new Error("No User Found"), next);
        const { title, date, location } = req.body;
        const isExisistingEvent = await Event.find({
            "owner._id": user._id,
            title,
            date,
            location
        });
        
        if (isExisistingEvent.length===0)
            return handleResponse(res, 401,null, new Error("No Event Found"), next);
       
        const event = await Event.findOneAndDelete({ title });
        return handleResponse(res,200,event,null,next);
    } catch (error) {
        return handleResponse(res, 500,null, error, next);
    }
}


export const updateDetails = async (req, res, next) => {

    const user = req.user;

    if (!user) return handleResponse(res, 401,null, new Error("No User Found"), next);

    const details = req.body;

    if (!details) return handleResponse(res, 406,null, new Error("Detials are required"), next);

    if (!details.currentTitle) return handleResponse(res, 406,null, new Error("Title is requrired"), next);

    try {
        const event = await Event.findOne({
            title: details.currentTitle,
            date: details.currentDate,
            location: details.currentLocation
        });
        if (!event) return handleResponse(res, 404,null, new Error("Event Not Found"), next);

        if (user._id !== event.owner._id) return handleResponse(res, 401,null, new Error("Title is Invalid"), next);

        const allowedFields = ['title', 'description', 'date', 'location', 'availableSeats'];

        for (const key in details) {
            if (allowedFields.includes(key)) {
                event[key] = details[key];
            }
        }
        await event.save();
        return handleResponse(res, 200, event,null, next);
    } catch (error) {
        return handleResponse(res, 500,null, error, next);
    }
}


export const getallEvents = async (req, res, next) => {
    try {
        const events = await Event.find().select(["-createdAt","-updatedAt","-_id ,-owner._id"]);
        return handleResponse(res, 200, events.length>0?events:"No events",null, next);
    } catch (error) {
        return handleResponse(res, 500,null, error, next);
    }
}