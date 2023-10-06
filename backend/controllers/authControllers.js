import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js"
import { generateToken } from "../utils/generateToken.js"
export const signUp = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = await User.create({
        username,
        email,
        password
    })
    res.status(201).json("User created successfully!");
})


export const signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            name: user.username,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error("Invalid email or passowrd!");
    }
})

//OAuth
export const google = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            generateToken(user._id, res);
            res.status(200).json({
                message: "Signed in using Google!",
                _id: user._id,
                name: user.username,
                email: user.email,
                avatar: user.avatar
            })
        } else {
            // becausse Google don't send us any password for user and password field is required, we need to generate one!
            //toString(36) generate from random numbers characters between 0 and 9 and from A to Z
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const newUser = await User.create({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: randomPassword,
                avatar: req.body.photo
            })
            generateToken(newUser._id, res)
            res.status(201).json({
                message: "Signed up using Google!",
                _id: newUser._id,
                name:  newUser.username,
                email: newUser.email,
                avatar: newUser.avatar
            });
        }
    } catch (err) {

    }
}