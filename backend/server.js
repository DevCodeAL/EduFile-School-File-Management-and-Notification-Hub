import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import http from "http";
import { Server } from "socket.io";
import ItemRoutes from './routes/ItemRoutes.js';
import compression from 'compression';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware setup 
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(compression());
app.use('/api', ItemRoutes);
app.use("/files", express.static("files"));
app.use('/profile', express.static('profile'));
app.use('/anouncements', express.static('anouncements'));
app.use('/newsFiles', express.static('newsFiles'));
app.use('/eventFiles', express.static('eventFiles'));

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this for your frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log("A teacher connected:", socket.id);

  socket.on("disconnect", () => {
    // console.log("A teacher disconnected:", socket.id);
  });
});

// Database connection
async function Database_Connection() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Successfully connected to MongoDB');
    } catch (err) {
        console.error('Connection error', err);
    }
}

// Call Database Connection 
Database_Connection();

// Start the server using `server.listen()`, not `app.listen()`
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export { io }; // Export io to use in other files when handling file uploads)
