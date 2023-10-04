import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js"

export const signUp = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    const newUser = await User.create({
        username,
        email,
        password
    })
    res.status(201).json("User created successfully!");
})