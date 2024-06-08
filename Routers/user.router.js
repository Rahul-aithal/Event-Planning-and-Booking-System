import { Router } from "express";
import { GetUsers, Getuser } from "../controllers/GetUsersControllers.js";
import { register } from "../controllers/RegisterController.js";
import { DelteUser } from "../controllers/DeleteController.js";
import { UpdateEmail, UpdateName, UpdatePassword } from "../controllers/UpadteController.js";


const router = Router()


router.get('/all', GetUsers)
router.get('/:id', Getuser)

router.post("/register", register)


router.put("/username", UpdateName);
router.put("/email", UpdateEmail);
router.put("/password", UpdatePassword);

router.delete("/deleteuser", DelteUser);

export default router;