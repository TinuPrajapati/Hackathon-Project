import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: [true, "Please enter the name of the user"],
    },
    feedback: {
      type: String,
      required: [true, "Please enter the feedback"],
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;
