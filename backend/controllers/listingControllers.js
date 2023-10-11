import asyncHandler from "../middlewares/asyncHandler.js";
import Listing from "../models/listingModel.js"

export const createListing = asyncHandler(async (req, res) => {
    const newListing = await Listing.create(req.body)
    if (newListing) {
        res.status(201).json({
            success: true,
            newListing
        })
    } else {
        res.status(400);
        throw new Error("Can not create listing!");
    }


})