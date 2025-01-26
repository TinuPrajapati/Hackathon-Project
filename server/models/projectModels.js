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
      default: "https://img.freepik.com/free-photo/project-plan-program-activity-solution-strategy-concept_53876-15827.jpg?t=st=1737881778~exp=1737885378~hmac=6a6736b01fc18ad20b1bdb75ba24cabd231a46cea0f19384eab463911d0d013d&w=740",
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
      enum: ["Private", "Public"],
      default: "Private",
      required: [true, "Please enter your project mode"],
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
