import { Router } from "express";
import { GetUsers, Getuser } from "../controllers/userControllers/GetUsersControllers.js";
import { register } from "../controllers/userControllers/RegisterController.js";
import { DelteUser } from "../controllers/userControllers/DeleteController.js";
import { UpdateEmail, UpdateName, UpdatePassword } from "../controllers/userControllers/UpadteController.js";


const router = Router()


router.post('/all', GetUsers)
router.get('/', Getuser)

router.post("/register", register)


router.put("/username", UpdateName);
router.put("/email", UpdateEmail);
router.put("/password", UpdatePassword);

router.delete("/deleteuser", DelteUser);

export default router;