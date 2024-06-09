import mongoose, { Schema } from "mongoose";



const bookingSchema = new mongoose.Schema(
    {
        eventName: {
            type: Schema.Types.ObjectId,
            ref:"Event"  //The name of the event
        },
        owner: {
            type: Schema.Types.ObjectId,    //The owener of event
            ref: "Event"    
        },
        booker: {
            type: Schema.Types.ObjectId,    //One who Books for event
            ref: "User"
        },



    }, { timestamps: true }
);


export const Booking = mongoose.model("Booking", bookingSchema);