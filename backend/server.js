import express from "express";
const app = express();
const port = 3000;
app.get("/", (req, res) => {
    res.send("Api is running...");
})

app.listen(port, () => {
    console.log(`Server is live on port: ${port}`);
})