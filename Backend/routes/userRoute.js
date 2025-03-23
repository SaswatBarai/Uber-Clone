import express, { Router } from 'express';
import validateRegister from "../utils/validateRegister.js";
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.post("/register",validateRegister,userController)

export default router;

 