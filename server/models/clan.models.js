import mongoose from "mongoose";

const clanSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Clan name is required"],
        unique: true,
      },
      about: {
        type: String,
        required: [true, "Clan about is required"],
      },
      members: {
        type: Number,
        default: 0,  // Use a number instead of an empty array
        max: [20, "Members should not be more than 20"],  // Correct validator for numbers
      },
      icon: {
        type: String,
        default: "",
      },
      // required for delete old image from cloudinary
      filename: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );
  
const Clan = mongoose.model("Clan", clanSchema);

export default Clan;
