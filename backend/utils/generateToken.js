import  jwt  from "jsonwebtoken";

export const generateToken = (id, res) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "3d"
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        nameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000 //3 days
    })
}