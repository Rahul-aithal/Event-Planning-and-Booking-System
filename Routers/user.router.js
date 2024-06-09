import { Router } from "express";
import { GetUsers, Getuser } from "../controllers/userControllers/GetUsersControllers.js";
import { register } from "../controllers/userControllers/RegisterController.js";
import { DelteUser } from "../controllers/userControllers/DeleteController.js";
import { UpdateEmail, UpdateName, UpdatePassword } from "../controllers/userControllers/UpadteController.js";
import { verifyToken } from "../middlewares/verifyJWT.middleware.js";
import { LogOut, Login, refreshAccessToken } from "../controllers/userControllers/LogController.js";

const router = Router()

router.use(verifyToken);

//Get Users
router.post('/all', GetUsers);
router.get('/', Getuser);

//Regiseter new User
router.post("/register", register)

//Log in or out user
router.post("/login", Login);
router.post("/logout/", verifyToken, LogOut);

//Givn new Access Token based on refrsh Token
router.post("/refreshaccesstoken",refreshAccessToken);

//Upadate user details
router.put("/username",UpdateName);
router.put("/email", UpdateEmail);
router.put("/password",UpdatePassword);

//Delete User
router.delete("/deleteuser", DelteUser);

export default router;