import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    userId: {
      type: String,
      required: [true, "Please enter your Unqiue userId"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: 6,
    },
    number: {
      type: Number,
      required: [true, "Please enter your number"],
      maxlength: 10,
    },
    profileImage: {
      type: String,
      default: "",
    },
    // this is required for delete existing image when user update/delete profile image
    filename: {
      type: String,
    },
    links: [
      {
        type: String,
      },
    ],
    skills: [
      {
        type: String,
      },
    ],
    interestedIn: [
      {
        type: String,
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
