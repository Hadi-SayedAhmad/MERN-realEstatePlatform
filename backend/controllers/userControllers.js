import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js"


//@desc update profile
//@route POST /api/user/update/:id
//@access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
    const { username, email, password, avatar } = req.body;
    // console.log(req.user);
    if (req.user && (req.user._id == req.params.id)) {
        const user = await User.findById(req.user._id)
        // console.log(user);
        if (user) {
            user.username = username || user.username;
            user.email = email || user.email;
            if (password) {
                user.password = password;
            }
            user.avatar = avatar || user.avatar;
            const updatedUser = await user.save();
            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.username,
                email: updatedUser.email,
                avatar: updatedUser.avatar

            })
        } else {
            res.status(404);
            throw new Error("User not found!");
        }

    } else {
        res.status(500);
        throw new Error("Can't update the profile!");
    }

})