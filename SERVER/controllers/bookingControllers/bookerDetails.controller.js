import { User } from "../../models/user.model.js";
import { handleResponse } from "../../utils/HnadleResponse.js";


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
                $project: {
                    username: 1,
                    email: 1,
                    bookedEvents: 1,
                    TotalBookedEvent: 1,
                    isBooked: 1
                }
            }]);

        ; // Convert cursor to array for easier handling
        // console.log("Bookings:", bookings);
    
        

        if (bookings.length === 0) {
            console.log("No bookings found for user.");
            return handleResponse(res, 404, null, new Error("No bookings found for user."), next);
        }

        return handleResponse(res, 200,  bookings, null, next);
    } catch (error) {
        console.error("Error:", error);
        return handleResponse(res, 500, null, error, next);
    }
}
