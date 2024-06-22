import { Router } from "express";

import { verifyToken } from "../middlewares/verifyJWT.middleware.js";
import { updateDetails, createEvent, deleteEvent, getallEvents } from "../controllers/eventControllers/eventController.js";

const router = Router()



//Get all exisiting events
router.get("/all-events",getallEvents);

//Create new Event
router.post("/add-event",verifyToken,createEvent);

//Delete Eevent
router.delete("/delete-event",verifyToken,deleteEvent);

//Upadte event Detials
router.put("/upadte-deatils",verifyToken,updateDetails);


export default router;