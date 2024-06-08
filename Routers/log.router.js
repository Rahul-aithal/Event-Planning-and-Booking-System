import { Router } from "express";
import { LogOut, Login, refreshAccessToken } from "../controllers/userControllers/LogController.js";
import { verifyToken } from "../middlewares/verifyJWT.middleware.js";

const router = Router()

router.post("/login", Login);
router.post("/logout/", verifyToken, LogOut);
router.post("/refreshaccesstoken",refreshAccessToken);


export default router;