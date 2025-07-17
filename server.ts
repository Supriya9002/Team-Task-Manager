import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
import socketHandler from "./src/sockets/socketHandler";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI!;

// Create HTTP server from Express app
const server = http.createServer(app);

// Setup Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: "*", // or use specific frontend domain
    credentials: true,
  },
});

// Handle all socket logic in separate file
socketHandler(io);

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
