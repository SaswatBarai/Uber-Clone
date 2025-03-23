import express from "express";
import validateCaptain from "../utils/validateCaptain.js";
import { captainRegisterController } from "../controllers/captain.controller.js";

const router = express.Router();

router.post("/register", validateCaptain, captainRegisterController);

export default router;
