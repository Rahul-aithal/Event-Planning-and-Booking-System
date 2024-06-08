import mongoose, { Schema } from "mongoose";



const eventSchema = new mongoose.Schema(
    {
        eventName: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        booker: {
            type: Schema.Types.ObjectId,    //One who Books for event
            ref: "User"
        },



    }, { timestamps: true }
);


export const Event = mongoose.model("Event", eventSchema);