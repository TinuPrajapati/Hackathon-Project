import Squad from "../models/Squad.js";

// Get all squads
const getAllSquads = async (req, res) => {
  try {
    const squads = await Squad.find();
    res.status(200).json(squads);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving squads", error: error.message });
  }
};

// Get a single squad by ID
const getSquadById = async (req, res) => {
  const { id } = req.params;
  try {
    const squad = await Squad.findById(id);
    if (!squad) {
      return res.status(404).json({ message: "Squad not found" });
    }
    res.status(200).json(squad);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving squad", error: error.message });
  }
};

// Create a new squad
const createSquad = async (req, res) => {
  try {
    const squad = new Squad(req.body);
    await squad.save();
    res.status(201).json({ message: "Squad created successfully", squad });
  } catch (error) {
    res.status(400).json({ message: "Error creating squad", error: error.message });
  }
};

// Update an existing squad
const updateSquad = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSquad = await Squad.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate the data before updating
    });
    if (!updatedSquad) {
      return res.status(404).json({ message: "Squad not found" });
    }
    res.status(200).json({ message: "Squad updated successfully", updatedSquad });
  } catch (error) {
    res.status(400).json({ message: "Error updating squad", error: error.message });
  }
};

// Delete a squad
const deleteSquad = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSquad = await Squad.findByIdAndDelete(id);
    if (!deletedSquad) {
      return res.status(404).json({ message: "Squad not found" });
    }
    res.status(200).json({ message: "Squad deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting squad", error: error.message });
  }
};

export default {
  getAllSquads,
  getSquadById,
  createSquad,
  updateSquad,
  deleteSquad,
};
