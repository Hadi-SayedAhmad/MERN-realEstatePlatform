import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        try {
            //try to decode the token to verify
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select("-password")
            if (user) {
                req.user = user;
            } else {
                res.status(404);
                throw new Error("User not found!");
            }
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized! Token failed.")
        }  
    } else {
        res.status(401);
        throw new Error("Not authorized! No token.")
    }
    
})