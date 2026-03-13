const express = require("express");
const router = express.Router();
const { getAllHotels, getUserInfo } = require("../controllers/HotelController");

router.get("/hotel-data", getAllHotels);
router.get("/userInfo", getUserInfo);

module.exports = router;