import express from "express";
import dotenv from "dotenv"
import userRouter from "./routes/userRoutes.js"
import authRouter from "./routes/authRoutes.js"

import connectDB from "./config/db.js";
const app = express();
app.use(express.json()); //to allow the server to recieve json data
dotenv.config();
const port = 3000;

connectDB();

app.get("/", (req, res) => {
    res.send("Api is running...");
})

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
    console.log(`Server is live on port: ${port}`);
})