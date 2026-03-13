import { getDB } from "../config/db.js";

const resortsCollection = () => getDB().collection("allResorts");
const userInfoCollection = () => getDB().collection("userInfo");

// GET /hotel-data
export const getAllHotels = async (req, res) => {
  try {
    const result = await resortsCollection().find().toArray();
    res.json(result);
  } catch (error) {
    console.error("Error fetching hotel data:", error);
    res.status(500).json({ error: "Error fetching hotel data" });
  }
};

// GET /userInfo
export const getUserInfo = async (req, res) => {
  try {
    const result = await userInfoCollection().find().toArray();
    res.json(result);
  } catch (error) {
    console.error("Error fetching userInfo data:", error);
    res.status(500).json({ error: "Error fetching userInfo data" });
  }
};