import express from "express"
import { protect } from "../middlewares/authMiddleware.js";
import {updateUserProfile, deleteUser} from "../controllers/userControllers.js"
import { createListing } from "../controllers/listingControllers.js";
const router = express.Router();

router.post("/update/:id", protect, updateUserProfile);
router.delete("/delete/:id", protect, deleteUser);
router.post("/create", protect, createListing)

export default router;