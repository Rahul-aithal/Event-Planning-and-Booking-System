
import { Router } from "express";
import { bookerDetails } from "../controllers/bookingControllers/bookerDetails.controller.js";
import { verifyToken } from "../middlewares/verifyJWT.middleware.js";
import { bookSeat } from "../controllers/bookingControllers/bookSeat.controller.js";

const router =Router();

router.get('/booker-details/:usesrname',verifyToken,bookerDetails);
router.post('/booke-event',verifyToken,bookSeat);


export default router;