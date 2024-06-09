import mongoose from "mongoose";


const eventSchema = mongoose.Schema( {
    owner: {
        type: Object,
        require:true,
        unique:ture
    },
    title: {
        type: String,    //One who Books for event
        require:true,
        unique:ture
    },
    description:{
        type:String,
    },
    date:{
        type:String,
        require:true,
    },
    location:{
        type:String,
        require:true,
    },
    availableSeats:{
        type:Number,
        require:true
    }


}, { timestamps: true });


eventSchema.index({"owner.id":1,title:1,date:1,location:1},{unique:true});

export const Event = mongoose.model("Event", eventSchema);