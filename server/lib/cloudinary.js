import multer from 'multer';
import { CloudinaryStorage } from '@fluidjs/multer-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config()
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Configure CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',  // Optional: Folder for uploaded files in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],  // Optional: Restrict allowed file types
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional: Apply image transformations on upload
  }
});

const upload = multer({ storage: storage })

// Multer upload instances for both storages
// const upload = multer({ storage });

export { cloudinary,upload };
