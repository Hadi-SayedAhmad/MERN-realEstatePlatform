import express from "express";
import { google, signIn, signUp } from "../controllers/authControllers.js";
const router = express.Router();

router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/google", google);

export default router;