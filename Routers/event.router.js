import { Router } from "express";

import { verifyToken } from "../middlewares/verifyJWT.middleware.js";
import { updateDetails, createEvent, deleteEvent, getallEvents } from "../controllers/eventControllers/eventController.js";

const router = Router()

router.use(verifyToken);

//Get all exisiting events
router.get("/all-eventes",getallEvents);

//Create new Event
router.post("/add-event",createEvent);

//Delete Eevent
router.delete("/delete-event",deleteEvent);

//Upadte event Detials
router.put("/upadte-deatils",updateDetails);


export default router;