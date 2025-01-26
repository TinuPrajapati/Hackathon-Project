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
    const user = await User.findById(userId).populate("projects feedbacks friends friendRequests");
    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};
export const allUsers = async (req, res) => {
  try {
    const { userId } = req.user;  // Get the logged-in user's ID
    const users = await User.find({ _id: { $ne: userId } })  // Exclude logged-in user
      .select("_id name profileImage about squad skills userId");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);  // Send all users except the logged-in one
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const specificUsers = async (req, res) => {
  try {
    const { id } = req.params; // Get the user ID from the URL params
    const { userId } = req.user; // Get the logged-in user's ID

    // Find the user by ID, excluding their password field
    const user = await User.findOne({userId: id }).select("-password");

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the logged-in user
    const loggedInUser = await User.findById(userId).select("friends").populate("friends")
   
    // Check if the logged-in user has this user in their friends array
    const isFriend = loggedInUser.friends.some(el => el._id.toString() === user._id.toString());
    console.log(isFriend)
    if (isFriend) {
      return res.status(200).json({
        message: "Already a Friend", 
        user,
        action:false // No action required as they are already friends
      });
    }else{
      res.status(200).json({
        message: "Add Friend",
        user,
        action:true // Indicate that a friend request can be sent
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
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
    const { 
      name, userId, about, email, number, 
      skills, location, gender, github, linkedin, 
      twitter, portfolio 
    } = req.body;

    let path = "";
    let filename = "";

    if (req.file) {
      path = req.file.path;
      filename = req.file.filename;
    }

    // Find the user before updating
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // If a new profile image is uploaded, delete the old one from Cloudinary
    if (existingUser.filename) {
      await cloudinary.uploader.destroy(existingUser.filename);
      existingUser.skills=[]
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
        profileImage: path || existingUser.profileImage, 
        filename: filename || existingUser.filename
      },
      { new: true, runValidators: true }
    );

    // If the user wasn't updated properly
    if (!updatedUser) {
      return res.status(400).json({ message: "Failed to update user" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addFriend = async (req, res) => {
  const { friendId } = req.body;
  const {userId} = req.user;
  if (!userId || !friendId) {
    return res.status(400).json({ success: false, message: "Invalid request data" });
  }

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (friend.friendRequests.includes(userId)) {
      return res.status(400).json({ success: false, message: "Request already sent" });
    }

    friend.friendRequests.push(userId);
    await friend.save();

    res.json({ success: true, message: "Friend request sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.body;
  const {userId} = req.user;
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(requestId);

    if (!user || !friend) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if request exists
    if (!user.friendRequests.includes(requestId)) {
      return res.status(400).json({ success: false, message: "No friend request found" });
    }

    // Add each other as friends
    user.friends.push(requestId);
    friend.friends.push(userId);

    // Remove request
    user.friendRequests = user.friendRequests.filter((id) => id.toString() !== requestId);
    
    await user.save();
    await friend.save();

    res.json({ success: true, message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const ignoreFriendRequest = async (req, res) => {
  const { requestId } = req.body; // The ID of the user who sent the friend request
  const { userId } = req.user;    // The ID of the logged-in user

  try {
    // Find both users in the database
    const user = await User.findById(userId);
    const friend = await User.findById(requestId);

    if (!user || !friend) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if a friend request actually exists
    if (!user.friendRequests.includes(requestId)) {
      return res.status(400).json({
        success: false,
        message: "No pending friend request from this user",
      });
    }

    // Remove the request from the user's friendRequests array
    user.friendRequests = user.friendRequests.filter(
      (id) => id.toString() !== requestId
    );

    await user.save();
    await friend.save();

    return res.status(200).json({
      success: true,
      message: "Friend request ignored",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
