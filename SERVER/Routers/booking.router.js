
import { Router } from "express";
import { bookerDetails } from "../controllers/bookingControllers/bookerDetails.controller.js";
import { verifyToken } from "../middlewares/verifyJWT.middleware.js";
import { bookSeat } from "../controllers/bookingControllers/bookSeat.controller.js";
import { unbookSeat } from "../controllers/bookingControllers/unbookSeat.controller.js";

const router = Router();

router.get('/booker-details/', verifyToken, bookerDetails);
router.post('/book-event/', verifyToken, bookSeat);
router.delete('/unbooking-event/', verifyToken, unbookSeat);

export default router;