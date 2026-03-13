import express from "express";
import {
  getAllEarnings,
  updateEarningByYear,
  bulkUpdateEarnings,
} from "../controllers/EarningsController.js";

const router = express.Router();

router.get("/yearly-earnings", getAllEarnings);
router.put("/yearly-earnings/:year", updateEarningByYear);
router.put("/yearly-earnings", bulkUpdateEarnings);

export default router;