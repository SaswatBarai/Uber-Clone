import { validationResult } from "express-validator";
import captainModel from "../model/captain.model.js";

const captainRegisterController = async (req, res) => {
    console.log("Request Body:", req.body); // Debugging line

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, fullname, password, vehicle } = req.body;
        if (!email || !fullname || !password || !vehicle) {
            return res.status(400).json({ errors: [{ msg: "Please enter all fields" }] });
        }
        const captain = await captainModel.findOne({ email }); // Added `await`
        if (captain) {
            return res.status(400).json({ errors: [{ msg: "Captain already exists" }] });
        }
        const hashedPassword = await captainModel.hashedPassword(password);
        const newCaptain = new captainModel({
            email,
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
            password: hashedPassword,
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType,
            },
        });
        await newCaptain.save();
        res.status(201).json({ msg: "Captain registered successfully" });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export { captainRegisterController };