import express from "express";
import {
  getAllEarnings,
  updateEarningByYear,
  bulkUpdateEarnings,
  getEarningList,
} from "../controllers/EarningsController.js";

const router = express.Router();

router.get("/yearly-earnings", getAllEarnings);
router.get("/all-earnings", getEarningList);
router.put("/yearly-earnings/:year", updateEarningByYear);
router.put("/yearly-earnings", bulkUpdateEarnings);

export default router;