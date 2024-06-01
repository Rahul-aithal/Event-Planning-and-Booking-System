import { Router } from "express";
import { Login } from "../controllers/LoginController.js";

const router = Router()

router.post("/login",Login);

export default router