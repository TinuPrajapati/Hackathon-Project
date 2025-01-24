import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter your project title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter your project description"],
      trim: true,
    },
    projectImage: {
      type: String,
      default: "",
    },
    // this is required for delete existing image when user update/delete project image
    filename: {
      type: String,
    },
    link: [
      {
        type: String,
      },
    ],
    mode: {
      type: String,
      required: [true, "Please enter your project mode"],
      default: "Private",
      enum: ["Private", "Public"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter your Project username"],
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
