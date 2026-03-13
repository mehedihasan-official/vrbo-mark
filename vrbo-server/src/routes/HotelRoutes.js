import express from "express";
import { getAllHotels, getUserInfo } from "../controllers/HotelController.js";

const router = express.Router();

router.get("/hotel-data", getAllHotels);
router.get("/userInfo", getUserInfo);

export default router;