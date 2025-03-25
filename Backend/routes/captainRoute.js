import express from "express";
import validateCaptain from "../utils/validateCaptain.js";
import { captainRegisterController,captainLoginController ,getProfile,logoutContrroller} from "../controllers/captain.controller.js";
import { validateLogin } from "../utils/validateRegister.js";
import {captainAuth} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validateCaptain, captainRegisterController);
router.post("/login",validateLogin,captainLoginController);
router.get("/getProfile",captainAuth,getProfile);
router.post("/logout",captainAuth,logoutContrroller);

export default router;
