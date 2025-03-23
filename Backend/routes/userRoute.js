import express, { Router } from 'express';
import {validateRegister,validateLogin} from "../utils/validateRegister.js";
import {userController, loginController} from '../controllers/user.controller.js';

const router = express.Router();

router.post("/register",validateRegister,userController)
router.post("/login",validateLogin,loginController)

export default router;

 