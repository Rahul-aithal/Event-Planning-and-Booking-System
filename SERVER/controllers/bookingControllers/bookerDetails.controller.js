import { User } from "../../models/user.model.js";
import { handleResponse } from "../../utils/HandleResponse.js";

export const bookerDetails = async (req, res, next) => {
    try {
        const userId = req.user._id;

        console.log("User ID:", userId);
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
                $unwind: "$bookedEvents"
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
                $unwind: "$eventDetails"
            },
            {
                $group: {
                    _id: "$_id",
                    username: { $first: "$username" },
                    email: { $first: "$email" },
                    bookedEvents: {
                        $push: {
                            _id: "$bookedEvents._id",
                            eventName: "$bookedEvents.eventName",
                            eventDetails: "$eventDetails",
                            // Add other booking fields if needed
                        }
                    },
                    TotalBookedEvent: { $first: { $size: "$bookedEvents" } },
                    isBooked: { $first: { $gt: [{ $size: "$bookedEvents" }, 0] } }
                }
            },
            {
                $project: {
                    username: 1,
                    email: 1,
                    bookedEvents: 1,
                    TotalBookedEvent: 1,
                    isBooked: 1
                }
            }
        ]);

        if (bookings.length === 0) {
            console.log("No bookings found for user.");
            return handleResponse(res, 404, null, new Error("No bookings found for user."), next);
        }

        return handleResponse(res, 200, bookings, null, next);
    } catch (error) {
        console.error("Error:", error);
        return handleResponse(res, 500, null, error, next);
    }
};
