const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/UserController");

router.get("/", getAllUsers);
router.get("/:email", getUserByEmail);
router.post("/", createUser);
router.put("/:id", updateUser);
router.patch("/:id", updateUserRole);
router.delete("/:id", deleteUser);

module.exports = router;