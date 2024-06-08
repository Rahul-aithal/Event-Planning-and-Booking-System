import mongoose, { Schema } from "mongoose";



const eventSchema = new mongoose.Schema(
    {
            booker:{
                type:Schema.Types.ObjectId,    //One who Books for event
                ref:"User"
            },
            
               
            
} , {timestamps:true}  
);


export const Event = mongoose.model("Event",eventSchema);