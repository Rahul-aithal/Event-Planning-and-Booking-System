import { User } from "../../models/user.model.js";
import { handleResponse } from "../../utils/HandleResponse.js";

export const bookerDetails = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const bookings = await User.aggregate([
            {
                $match: {
                    _id: userId // Match by _id
                }
            },
            {
                $lookup: {
                    from: "bookings",
                    localField: "_id",
                    foreignField: "booker",
                    as: "bookedEvents"
                }
            },
            {
                $addFields: {
                    TotalBookedEvent: {
                        $size: "$bookedEvents"
                    },
                    isBooked: {
                        $gt: [{ $size: "$bookedEvents" }, 0] // Check if there are any booked events
                    }
                }
            },
            {
                $unwind: {
                    path: "$bookedEvents",
                    preserveNullAndEmptyArrays: true // Include users with no bookings
                }
            },
            {
                $lookup: {
                    from: "events",
                    localField: "bookedEvents.eventName",
                    foreignField: "_id",
                    as: "eventDetails"
                }
            },
            {
                $unwind: {
                    path: "$eventDetails",
                    preserveNullAndEmptyArrays: true // Include bookings without event details
                }
            },
            {
                $match: {
                    eventDetails: { $ne: null },
                }
            },
            {
                $group: {
                    _id: "$_id",
                    username: { $first: "$username" },
                    email: { $first: "$email" },
                    bookedEvents: {
                        $push: {
                            _id: "$bookedEvents._id",
                            eventDetails: {
                                title: "$eventDetails.title",
                                description: "$eventDetails.description",
                                date: "$eventDetails.date",
                                location: "$eventDetails.location",
                                availableSeats: "$eventDetails.availableSeats",
                                owner: "$eventDetails.owner.username"
                            }
                        }
                    },
                    TotalBookedEvent: { $first: "$TotalBookedEvent" },
                    isBooked: { $first: "$isBooked" }
                }
            },
            {
                $project: {
                    username: 1,
                    email: 1,
                    bookedEvents: {
                        $filter: {
                            input: "$bookedEvents",
                            as: "bookedEvent",
                            cond: { $ne: ["$$bookedEvent._id", null] }
                        }
                    },
                    TotalBookedEvent: 1,
                    isBooked: 1
                }
            }
        ]);

        if (bookings.length === 0) {

            return handleResponse(res, 404, null, new Error("No bookings found for user."), next);
        }

        return handleResponse(res, 200, bookings, null, next);
    } catch (error) {
        console.error("Error:", error);
        return handleResponse(res, 500, null, error, next);
    }
};
