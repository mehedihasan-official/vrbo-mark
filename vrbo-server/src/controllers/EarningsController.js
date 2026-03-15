import { getDB } from "../config/db.js";

const earningsCollection = () => getDB().collection("yearlyEarnings");
const earningListCollection = () => getDB().collection("earningList");

// GET /yearly-earnings
export const getAllEarnings = async (req, res) => {
  try {
    const result = await earningsCollection().find().sort({ year: 1 }).toArray();
    res.json(result);
  } catch (error) {
    console.error("Error fetching yearly earnings:", error);
    res.status(500).json({ error: "Error fetching yearly earnings" });
  }
};

// GET /yearly-earnings-list
export const getEarningList = async (req, res) => {
  try {
    const result = await earningListCollection().find().sort({ year: 1 }).toArray();
    res.json(result);
  } catch (error) {
    console.error("Error fetching yearly earnings:", error);
    res.status(500).json({ error: "Error fetching yearly earnings" });
  }
};

// PUT /yearly-earnings/:year
export const updateEarningByYear = async (req, res) => {
  try {
    const { year } = req.params;
    const { amount } = req.body;

    if (!year || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid year or amount" });
    }

    const result = await earningsCollection().updateOne(
      { year },
      { $set: { amount } },
      { upsert: true }
    );

    res.json({
      message: "Yearly earnings updated successfully",
      year,
      amount,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      upsertedId: result.upsertedId,
    });
  } catch (error) {
    console.error("Error updating yearly earnings:", error);
    res.status(500).json({ error: "Error updating yearly earnings" });
  }
};

// PUT /yearly-earnings → bulk update
export const bulkUpdateEarnings = async (req, res) => {
  try {
    const earningsData = req.body;

    if (!Array.isArray(earningsData)) {
      return res.status(400).json({ error: "Expected array of earnings data" });
    }

    const bulkOps = earningsData.map((entry) => ({
      updateOne: {
        filter: { year: entry.year },
        update: { $set: { amount: entry.amount } },
        upsert: true,
      },
    }));

    const result = await earningsCollection().bulkWrite(bulkOps);

    res.json({
      message: "Bulk update successful",
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      upsertedCount: result.upsertedCount,
    });
  } catch (error) {
    console.error("Error bulk updating yearly earnings:", error);
    res.status(500).json({ error: "Error bulk updating yearly earnings" });
  }
};