import express from "express";
import dotenv from "dotenv"
import userRouter from "./routes/userRoutes.js"


import connectDB from "./config/db.js";
const app = express();
dotenv.config();
const port = 3000;

connectDB();

app.get("/", (req, res) => {
    res.send("Api is running...");
})

app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log(`Server is live on port: ${port}`);
})