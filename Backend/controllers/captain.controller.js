import { validationResult } from "express-validator";
import captainModel from "../model/captain.model.js";
import BlacklistToken from "../model/blacklistToken.model.js";

const captainRegisterController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, fullname, password, vehicle } = req.body;
    if (!email || !fullname || !password || !vehicle) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Please enter all fields" }] });
    }
    const captain = await captainModel.findOne({ email });
    if (captain) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Captain already exists" }] });
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
};

const captainLoginController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }

    console.log(req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Please enter all fields" }] });
    }

    const user = await captainModel.findOne({ email }).select("+password -__v");
    if (!user) {
      return res.status(400).json({
        error: "Something Went Wrong !",
      });
    }
    const isPassword = await user.comparePassword(password);

    if (!isPassword) {
      return res.status(400).json({
        error: "Something Went Wrong !",
      });
    }
    const token = await user.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.error("Errors: ", error.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const getProfile = async (req, res) => {
  try {

    const user = req.captain;
    const { createdAt, updatedAt, __v, password, ...filteredUser } = user.toObject();
    res.status(200).json({ user: filteredUser });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const logoutContrroller = async (req,res) => {
    const token =  req.cookies.token || req.headers.authorization?.split(" ")[1];
    await BlacklistToken.create({token});
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};

export { captainRegisterController, captainLoginController,getProfile,logoutContrroller };
