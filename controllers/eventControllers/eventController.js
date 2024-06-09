import { Event } from "../../models/event.model";
import { handleResponse } from "../../utils/HnadleResponse";

export const createEvent = async (req, res, next) => {
    const user = req.user;
    if (!user) return handleResponse(res, 401, _, new Error("No User Found"), next);

    const { title, description, date, location, availableSeats } = req.body;

    if (!(title && description && date && location && availableSeats))
        return handleResponse(res, 400, _, new Error("All fields are Complsory"), next);

    try {
        const isExisistingEvent = await Event.findOne({
            "owner.id": user.id,
            title,
            date,
            location
        })
        if (isExisistingEvent)
            return handleResponse(res, 401, isExisistingEvent, new Error("Event already present give anthore title"), next);
        const event = await Event.create({
            owner: {
                id: user.id,
                email: user.email,
                username: user.username
            },
            title,
            description,
            date,
            location,
            availableSeats
        });
        return handleResponse(res, 201, event, _, next);
    } catch (error) {
        return handleResponse(res, 500, _, error, next);
    }
}


export const deleteEvent = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) return handleResponse(res, 401, _, new Error("No User Found"), next);
        const { title, date, location } = req.body;
        const isExisistingEvent = await Event.find({
            "owner.id": user.id,
            title,
            date,
            location
        });
        if (!isExisistingEvent)
            return handleResponse(res, 401, _, new Error("No Event Found"), next);
        await Event.findOneAndDelete({ title });
    } catch (error) {
        return handleResponse(res, 500, _, error, next);
    }
}


export const updateDetails = async (req, res, next) => {

    const user = req.user;

    if (!user) return handleResponse(res, 401, _, new Error("No User Found"), next);

    const details = req.body;

    if (!details) return handleResponse(res, 406, _, new Error("Detials are required"), next);

    if (!details.title) return handleResponse(res, 406, _, new Error("Title is requrired"), next);

    try {
        const event = await Event.findOne({
            title: details.title,
            date: details.date,
            location: details.location
        });
        if (!event) return handleResponse(res, 404, _, new Error("Event Not Found"), next);

        if (user.id !== event.owner.id) return handleResponse(res, 401, _, new Error("Title is Invalid"), next);

        const allowedFields = ['title', 'description', 'date', 'location', 'availableSeats'];

        for (const key in details) {
            if (details.hasOwnProperty(key)&&allowedFields.includes(key)) {
                event[key] = details[key];
            }
        }
        await event.save();
        return handleResponse(res, 200, event, _, next);
    } catch (error) {
        return handleResponse(res, 500, _, error, next);
    }
}


export const getallEvents = async (req, res, next) => {
    try {
        const events = await Event.find();
        return handleResponse(res, 200, events, _, next);
    } catch (error) {
        return handleResponse(res, 500, _, error, next);
    }
}