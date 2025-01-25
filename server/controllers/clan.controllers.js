import Clan from "../models/clan.models.js";
import { cloudinary } from "../lib/cloudinary.js";

export const getAllClans = async (req, res) => {
    try {
        const clans = await Clan.find({}).select("-filename").lean();
        if (!clans || clans.length === 0) {
            return res.status(404).json({ message: "No Group found" });
        }
        res.status(200).json(clans);
    } catch (error) {
        console.error("Error in getAllClans:", error.message);
        res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
};

export const getClan = async (req, res) => {
    try {
        const clan = await Clan.findOne({ name: req.params.name }).select("-filename").lean();
        if (!clan) {
            return res.status(404).json({ message: "Group not found! Please check the group name." });
        }
        res.status(200).json(clan);
    } catch (error) {
        console.error("Error in getClan:", error.message);
        res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
};

export const addClan = async (req, res) => {
    try {
        const { name, about, members } = req.body;
        const path = req.file ? req.file.path : "";
        const filename = req.file ? req.file.filename : "";

        if (members > 20) {
            return res.status(400).json({ message: "Members should not be more than 20" });
        }

        const existingClan = await Clan.findOne({ name });
        if (existingClan) {
            return res.status(400).json({ message: "This Group Name already exists! Please choose another name." });
        }

        const newClan = new Clan({
            name,
            about,
            members,
            icon: path,
            filename,
        });

        const savedClan = await newClan.save();
        if (!savedClan) {
            return res.status(400).json({ message: "Unable to add group" });
        }

        res.status(201).json(savedClan);
    } catch (error) {
        console.error("Error in addClan:", error.message);
        res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
};

export const updateClan = async (req, res) => {
    try {
        const { id,name, about, members } = req.body;
        const icon = req.file ? req.file.path : "";
        const filename = req.file ? req.file.filename : "";

        if (members > 20) {
            return res.status(400).json({ message: "Members should not be more than 20" });
        }

        const clan = await Clan.findById(id);
        if (!clan) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Delete old image from Cloudinary if a new one is provided
        if (clan.filename) {
            await cloudinary.uploader.destroy(clan.filename);
        }

        const updatedClan = await Clan.findOneAndUpdate({ name }, {
            name,
            about,
            members,
            icon,
            filename,
        }, { new: true });
        if (!updatedClan) {
            return res.status(400).json({ message: "Unable to update group" });
        }

        res.status(200).json(updatedClan);
    } catch (error) {
        console.error("Error in updateClan:", error.message);
        res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
};

export const deleteClan = async (req, res) => {
    try {
        const { id } = req.params;
        const clan = await Clan.findById(id);
        if (!clan) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Delete old image from Cloudinary before deleting
        if (clan.filename) {
            await cloudinary.uploader.destroy(clan.filename);
        }

        await Clan.findByIdAndDelete(id);
        res.status(200).json({ message: "Group deleted successfully" });
    } catch (error) {
        console.error("Error in deleteClan:", error.message);
        res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
};
