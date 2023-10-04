import express from "express";
const app = express();
import dotenv from "dotenv"
dotenv.config();
const port = 3000;
import connectDB from "./config/db.js";
connectDB();
app.get("/", (req, res) => {
    res.send("Api is running...");
})

app.listen(port, () => {
    console.log(`Server is live on port: ${port}`);
})