import express from "express";
import {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  updateUserRole,
  deleteUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:email", getUserByEmail);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.patch("/users/:id", updateUserRole);
router.delete("/users/:id", deleteUser);

export default router;