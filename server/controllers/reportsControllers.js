import Report from "../models/reportModels.js";
import User from "../models/userModels.js";

export const getReports = async (req, res) => {
    try {
        const { username } = req.params;
        const reports = await Report.findOne({ username }).populate("byUser", "name email ");
        if(!reports) {
            return res.status(404).json({ message: "No reports found relate this user" });
        }
        res.status(200).json(reports);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const allReports = async (req, res) => {
    try {
        const reports = await Report.find({}).populate("byUser", "name email ");
        if(!reports) {
            return res.status(404).json({ message: "No reports found" });
        }
        res.status(200).json(reports);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const addReport = async (req, res) => {
    try {
        const { username, feedback } = req.body;
        const byUser = req.user.userId;
        const user = await User.findOne({ name:username });
        if(!user) {
            return res.status(404).json({ message: "This User not found! Please check the username" });
        }
        const newReport = new Report({ username, feedback, byUser });
        user.feedbacks.push(newReport._id);
        await newReport.save();
        await user.save();
        res.status(201).json(newReport);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}