import mongoose from "mongoose";

const SquadSchema = new mongoose.Schema(
  {
    squadName: {
      type: String,
      required: [true, "Squad name is required"],
      trim: true,
    },
    squadDescription: {
      type: String,
      required: [true, "Squad description is required"],
      trim: true,
    },
    selectedSkills: {
      type: [String], // Array of strings for skills
      default: [],
    },
    memberLimit: {
      type: Number,
      default: 4,
      min: [4, "Member limit must be at least 4"],
      max: [20, "Member limit cannot exceed 20"],
    },
    image: {
      type: String, // Store image as base64 or URL
      default: null,
    },
    generatedTest: {
      topics: {
        type: [String],
        default: [],
      },
      difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        default: "easy",
      },
      questions: {
        type: Array,
        default: [],
      },
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  }
);

export default mongoose.model("Squad", SquadSchema);
