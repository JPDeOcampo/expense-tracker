import mongoose from "mongoose";

const connectMongoDB = async () => {
  const url = process.env.MONGODB_URI;

  if (!url) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectMongoDB;
