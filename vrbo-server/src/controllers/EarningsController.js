const { getDB } = require("../config/db");

const getCollection = () => getDB().collection("yearlyEarnings");

// GET /yearly-earnings
const getAllEarnings = async (req, res) => {
  try {
    const result = await getCollection().find().sort({ year: 1 }).toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching yearly earnings" });
  }
};

// PUT /yearly-earnings/:year
const updateEarningByYear = async (req, res) => {
  try {
    const { year } = req.params;
    const { amount } = req.body;

    if (!year || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid year or amount" });
    }

    const result = await getCollection().updateOne(
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
    res.status(500).json({ error: "Error updating yearly earnings" });
  }
};

// PUT /yearly-earnings  → bulk update
const bulkUpdateEarnings = async (req, res) => {
  try {
    const earningsData = req.body;

    if (!Array.isArray(earningsData)) {
      return res.status(400).json({ error: "Expected an array of earnings data" });
    }

    const bulkOps = earningsData.map((entry) => ({
      updateOne: {
        filter: { year: entry.year },
        update: { $set: { amount: entry.amount } },
        upsert: true,
      },
    }));

    const result = await getCollection().bulkWrite(bulkOps);

    res.json({
      message: "Bulk update successful",
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      upsertedCount: result.upsertedCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Error bulk updating yearly earnings" });
  }
};

module.exports = { getAllEarnings, updateEarningByYear, bulkUpdateEarnings };