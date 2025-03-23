import express, { Router } from 'express';
import {validateRegister,validateLogin} from "../utils/validateRegister.js";
import {userController, loginController,getProfile} from '../controllers/user.controller.js';
import userAuth from "../middlewares/auth.middleware.js";



const router = express.Router();

router.post("/register",validateRegister,userController)
router.post("/login",validateLogin,loginController)
router.get("/getProfile",userAuth,getProfile)

export default router;

 