import User from "../models/userModel.js"

export async function signUp(req, res) {
    const {username, email, password} = req.body;
    try {
        const newUser = await User.create({
            username,
            email,
            password
        })
        res.status(201).json("User created successfully!");
    } catch (error) {
        res.status(500).json(error.message)
    }
    
}