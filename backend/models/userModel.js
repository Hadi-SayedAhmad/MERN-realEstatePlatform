import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
}, {
    timestamps: true
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    } 
    this.password = await bcrypt.hash(this.password, 10);
})

const User = mongoose.model("User", userSchema);


export default User;