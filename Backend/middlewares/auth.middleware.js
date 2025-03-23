import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userAuth = async (req,res,next)=>{
    const token =  req.cookies.token || req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select("-v -updatedAt -createdAt");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }   
        req.user = user;
        return next();
    } catch (error) {
        res.status(500).json({message:"Internal Server Error",error:error.message});
        
    }
}

export default userAuth;