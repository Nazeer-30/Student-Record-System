import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // CRITICAL FIX: Use the environment variable set on Render
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      // Log an error if the environment variable is missing
      console.error("FATAL ERROR: MONGODB_URI is not defined in environment variables.");
      // Exit the process to prevent the server from trying to run without a DB
      process.exit(1); 
    }

    // Connect using the Atlas URI
    await mongoose.connect(mongoURI);
    
    console.log("MongoDB Connected to Atlas!");
    
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Exit process with failure code
    process.exit(1);
  }
};

export default connectDB;
