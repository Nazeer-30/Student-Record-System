import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"; 

const app = express();
// NOTE: connectDB() should be modified to use process.env.MONGODB_URI
connectDB();

// Allow requests from all origins (important for development and separation of services)
// For better security, you might want to replace '*' with your deployed frontend URL later.
app.use(cors()); 
app.use(express.json());

// API routes
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes); 

// 1. Use Render's dynamic port (process.env.PORT) or default to 5000 for local development.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
