import { Router } from "express";
import {   GetUsers, Getuser,} from "../controllers/GetUsersControllers.js";
import { SignUp } from "../controllers/SignUpController.js";
import { DelteUser } from "../controllers/DeleteController.js";
import { UpdateEmail, UpdateName, UpdatePassword } from "../controllers/UpadteController.js";


const router = Router()


router.get('/all',GetUsers )
router.get('/:id',Getuser )

router.post("/", SignUp)


router.put("/username/:id",UpdateName );
router.put("/email/:id",UpdateEmail );
router.put("/password/",UpdatePassword );

router.delete("/deleteuser/:id",DelteUser);

export default router;