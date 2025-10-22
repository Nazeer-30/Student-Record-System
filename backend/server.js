import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"; 

const app = express();

// --- CRITICAL STEP: CORS CONFIGURATION ---
// Get the URL of your deployed Frontend Static Site from Render (e.g., https://student-record-app.onrender.com)
// If you don't know it, keep it as '*' temporarily, but using the specific URL is best practice.
const allowedOrigins = [
    // Replace the URL below with YOUR actual deployed frontend URL (e.g., https://your-app-name.onrender.com)
    process.env.FRONTEND_URL || 'https://student-record-app.onrender.com', 
    'http://localhost:3000' // For local testing
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true); 
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));
// ------------------------------------------

connectDB();

app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
