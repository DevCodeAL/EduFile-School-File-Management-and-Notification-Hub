import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import ItemRoutes from './routes/ItemRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;  // Use environment variable for port or fallback to 5000
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware setup 
app.use(cors());
app.use(express.json());  // Use express.json() to parse JSON payloads
app.use(bodyParser.json());
app.use('/api', ItemRoutes);
app.use("/files", express.static("files"));



// Function to connect to the database
async function Database_Connection() {
    try {
        await mongoose.connect(MONGODB_URI);
        
        console.log('Successfully connected to MongoDB');  // Log successful connection
    } catch (err) {
        console.error('Connection error', err);  // Log any connection errors
    }
}
    // Initialize the database connection
    Database_Connection();

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);  // Log server start
});
