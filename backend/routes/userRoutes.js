import express from "express"
import { deleteUser, updateUserProfile } from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/update/:id", protect, updateUserProfile);
router.delete("/delete/:id", protect, deleteUser);


export default router;