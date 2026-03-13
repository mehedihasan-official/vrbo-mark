const { getDB } = require("../config/db");

// GET /hotel-data
const getAllHotels = async (req, res) => {
  try {
    const result = await getDB().collection("allResorts").find().toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching hotel data" });
  }
};

// GET /userInfo
const getUserInfo = async (req, res) => {
  try {
    const result = await getDB().collection("userInfo").find().toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching userInfo data" });
  }
};

module.exports = { getAllHotels, getUserInfo };