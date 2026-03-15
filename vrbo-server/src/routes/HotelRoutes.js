import express from "express";
import { getAllHotels, getHotelList, getUserInfo } from "../controllers/HotelController.js";

const router = express.Router();

router.get("/hotel-data", getAllHotels);
router.get("/hotels-list", getHotelList);
router.get("/userInfo", getUserInfo);

export default router;