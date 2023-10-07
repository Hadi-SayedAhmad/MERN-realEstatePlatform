import express from "express"
import { updateUserProfile } from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/update/:id", protect, updateUserProfile);



export default router;