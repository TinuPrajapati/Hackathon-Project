import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter the name of the user"],
    },
    feedback: {
      type: String,
      required: [true, "Please enter the feedback"],
    },
    byUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter the username who gave the feedback"],
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;
