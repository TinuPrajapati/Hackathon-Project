import generateToken from "../lib/generateToken.js";
import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import { cloudinary } from "../lib/cloudinary.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, number, location, gender } = req.body;

    // Generate a userId using the first part of the name and a random number
    const generateUserId = (name) => {
      const randomNum = Math.floor(1000 + Math.random() * 900000); 
      const namePart = name.replace(/\s+/g, '').substring(0, 4);
      let userId = (namePart + "_"+randomNum).substring(0, 10); // Ensure the total length is 10
      return userId.toLowerCase(); // Convert to lowercase for consistency
    };

    const userId = generateUserId(name);

    // Check if email, generated userId, or number already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { userId }, { number }] 
    });

    if (existingUser) {
      let conflicts = [];

      if (existingUser.email === email) conflicts.push("email");
      if (existingUser.userId === userId) conflicts.push("userId");
      if (existingUser.number == number) conflicts.push("number");

      let conflictMessage = conflicts.join(", ");

      return res.status(400).json({
        message: `User already exists with this ${conflictMessage}`,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      userId,
      email,
      password: hashedPassword,
      number,
      location,
      gender
    });

    await newUser.save();

    // Generate token and set cookie
    generateToken(newUser, res);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getUser = async (req, res) => {
  try {
    const {userId} = req.user;
    const user = await User.findById(userId).populate("projects feedbacks friends");
    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate token and set cookie
    generateToken(user, res);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// Logout User
export const logoutUser = (req, res) => {
  try {
    res.cookie(process.env.COOKIE_SECRET, "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// Update User Details

export const updateUser = async (req, res) => {
  try {
    const { userId: id } = req.user;
    const { name, userId,about, email, number, skills,location,gender,github,linkedin,twitter,portfolio } = req.body;
    let path = "";
    let filename = "";
    if(req.file){
    path = req?.file?.path,
    filename = req?.file?.filename
    }
    console.log(req.file)
    // Find the user before updating
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // If a new profile image is uploaded, delete the old one from Cloudinary
    if(existingUser.filename){
      await cloudinary.uploader.destroy(existingUser.filename); 
    }

    // Update the user information
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        userId,
        email,
        about,
        number,
        skills,
        location,
        gender,
        github,
        linkedin,
        twitter,
        portfolio,
        profileImage: path ? path : "",  // Set empty string if no new image
        filename: filename ? filename : "" // Set empty string if no new image
      },
      { new: true, runValidators: true }
    );

    // If the user wasn't updated properly
    if (!updatedUser) {
      return res.status(404).json({ message: "Failed to update user" });
    }

    res.status(200).json({ message: "User updated successfully" ,updateUser});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

