import { Router } from "express";
import { GetUsers, Getuser } from "../controllers/userControllers/GetUsersControllers.js";
import { register } from "../controllers/userControllers/RegisterController.js";
import { DelteUser } from "../controllers/userControllers/DeleteController.js";
import { UpdateEmail, UpdateName, UpdatePassword } from "../controllers/userControllers/UpadteController.js";
import { verifyToken } from "../middlewares/verifyJWT.middleware.js";
import { LogOut, Login, refreshAccessToken } from "../controllers/userControllers/LogController.js";

const router = Router()

// router.use(verifyToken);

//Get Users
router.get('/all', GetUsers);
router.get('/user',verifyToken, Getuser);

//Regiseter new User
router.post("/register", register)

//Log in or out user
router.post("/login", Login);
router.post("/logout", verifyToken, LogOut);

//Givn new Access Token based on refrsh Token
router.post("/refreshaccesstoken",refreshAccessToken);

//Upadate user details
router.put("/username",verifyToken,UpdateName);
router.put("/email", verifyToken,UpdateEmail);
router.put("/password",verifyToken,UpdatePassword);

//Delete U
router.delete("/deleteuser", verifyToken,DelteUser);

export default router;