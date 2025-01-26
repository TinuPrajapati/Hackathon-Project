import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "@fluidjs/multer-cloudinary";
import multer from "multer";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Brain Squad',  // Optional: Folder for uploaded files in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],  // Optional: Restrict allowed file types
  }
});

// Multer upload instances for both storages
const upload = multer({ storage });

export { cloudinary,upload };
