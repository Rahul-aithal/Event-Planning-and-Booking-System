import { Router } from "express";
import { LogOut, Login } from "../controllers/LogController.js";
import { verifyToken } from "../middlewares/verifyJWT.middleware.js";

const router = Router()

router.post("/login", Login);
router.post("/logout",verifyToken, LogOut);

export default router