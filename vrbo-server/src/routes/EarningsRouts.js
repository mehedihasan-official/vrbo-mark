const express = require("express");
const router = express.Router();
const {
  getAllEarnings,
  updateEarningByYear,
  bulkUpdateEarnings,
} = require("../controllers/EarningsController");

router.get("/", getAllEarnings);
router.put("/:year", updateEarningByYear);
router.put("/", bulkUpdateEarnings);

module.exports = router;