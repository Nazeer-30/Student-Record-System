import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"; 

const app = express();

// --- CRITICAL STEP: CORS CONFIGURATION (Temporary Universal Fix) ---
// We are setting origin: '*' temporarily to confirm the connection works. 
// This ensures the deployed frontend (on Render) can talk to the deployed backend (on Render).
app.use(cors({
    origin: '*', // Allows requests from ANY origin.
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));
// ------------------------------------------

connectDB();

app.use(express.json());

// API routes
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes); 

// Use Render's dynamic port (process.env.PORT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
