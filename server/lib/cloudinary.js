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

// Configure CloudinaryStorage for student images
const student_Image = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Student-Image", // Folder for student images
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed file types
  },
});

// Configure CloudinaryStorage for project images
const project_Image = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Project-Image", // Folder for project images
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed file types
  },
});
// Configure CloudinaryStorage for project images
const clan_Image = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "CLan-Image", // Folder for project images
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed file types
  },
});

// Multer upload instances for both storages
const uploadStudentImage = multer({ storage: student_Image });
const uploadProjectImage = multer({ storage: project_Image });
const uploadClanImage = multer({ storage: clan_Image });

export { uploadStudentImage, uploadProjectImage,cloudinary,uploadClanImage };
