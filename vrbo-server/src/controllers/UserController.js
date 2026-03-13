const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const getCollection = () => getDB().collection("users");

// GET /users
const getAllUsers = async (req, res) => {
  try {
    const result = await getCollection().find().toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

// GET /users/:email
const getUserByEmail = async (req, res) => {
  try {
    const user = await getCollection().findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

// POST /users
const createUser = async (req, res) => {
  try {
    const { uid, name, email, imageURL } = req.body;

    if (!uid || !name || !email) {
      return res.status(400).json({ error: "Missing required fields: uid, name, email" });
    }

    const existingUser = await getCollection().findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists", user: existingUser });
    }

    const newUser = {
      uid,
      name,
      email,
      imageURL: imageURL || null,
      isAdmin: false,
      createdAt: new Date(),
      lastLogin: new Date(),
    };

    await getCollection().insertOne(newUser);
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

// PUT /users/:id
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const result = await getCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

// PATCH /users/:id  → update role
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAdmin } = req.body;

    if (typeof isAdmin !== "boolean") {
      return res.status(400).json({ error: "isAdmin must be a boolean" });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const result = await getCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { isAdmin } }
    );

    if (result.matchedCount === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user role" });
  }
};

// DELETE /users/:id
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const result = await getCollection().deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  updateUserRole,
  deleteUser,
};