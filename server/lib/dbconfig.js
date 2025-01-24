import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect(process.env.dbURI);
    console.log('Connected to the database');
  } catch (error) {
    console.log('Error connecting to the database: ', error);
  }
}

export default main;