import { validationResult } from "express-validator";
import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";

const userController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        const { fullname, email, password } = req.body;
        if (!fullname || !fullname.firstname || !fullname.lastname || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const { firstname, lastname } = fullname;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            fullname: {
                firstname,
                lastname,
            },
            email,
            password: hashedPassword,
        });
        await newUser.save();
        const token = await newUser.genrateAuthToken();
        res.status(201).json({ token, newUser });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error",error:error.message });
    }
};

const loginController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        console.log(req.body);

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const user = await userModel.findOne({ email }).select("-__v -updatedAt -createdAt");
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isMatch = user.matchPassword(password);   
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = await user.genrateAuthToken();
        res.status(200).json({ token, user });
    } catch (error) {
        console.error("Error in loginController:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export { userController, loginController }