import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

const usersCollection = () => getDB().collection("users");

// GET /users
export const getAllUsers = async (req, res) => {
  try {
    const result = await usersCollection().find().toArray();
    res.json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};

// GET /users/:email
export const getUserByEmail = async (req, res) => {
  try {
    const user = await usersCollection().findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
};

// POST /users
export const createUser = async (req, res) => {
  try {
    const { uid, name, email, imageURL } = req.body;

    if (!uid || !name || !email) {
      return res.status(400).json({ error: "Missing required fields (uid, name, email)" });
    }

    const existingUser = await usersCollection().findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists", user: existingUser });
    }

    const newUser = {
      uid,
      name,
      email,
      imageURL: imageURL || null,
      createdAt: new Date(),
      isAdmin: false,
      lastLogin: new Date(),
    };

    await usersCollection().insertOne(newUser);
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

// PUT /users/:id
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const result = await usersCollection().updateOne(
      { _id: new ObjectId(userId) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

// PATCH /users/:id → update role
export const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { isAdmin } = req.body;

    if (typeof isAdmin !== "boolean") {
      return res.status(400).json({ error: "Invalid role data" });
    }

    const result = await usersCollection().updateOne(
      { _id: new ObjectId(userId) },
      { $set: { isAdmin } }
    );

    if (result.matchedCount === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "Error updating user role" });
  }
};

// DELETE /users/:id
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const result = await usersCollection().deleteOne({ _id: new ObjectId(userId) });

    if (result.deletedCount === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
};