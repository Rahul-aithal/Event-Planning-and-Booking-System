import mongoose from "mongoose";


const eventSchema = mongoose.Schema( {
    owner: {
        type: Object,
        require:true,
       
    },
    title: {
        type: String,    //One who Books for event
        require:true,
      
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
    },
    bookedSeats:{
        type:Number
    }


}, { timestamps: true });


eventSchema.index({"owner._id":1,title:1,date:1,location:1},{unique:true});

export const Event = mongoose.model("Event", eventSchema);