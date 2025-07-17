import { Server, Socket } from "socket.io";

const activeUsers = new Map<string, string>(); // userId -> socketId

export default function socketHandler(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log(`📡 New client connected: ${socket.id}`);

    // When a user joins (e.g. after login)
    socket.on("join", (userId: string) => {
      activeUsers.set(userId, socket.id);
      console.log(`👤 User ${userId} joined with socket ${socket.id}`);
    });

    // Example: Task assigned in real-time
    socket.on("assignTask", ({ toUserId, task }) => {
      const receiverSocketId = activeUsers.get(toUserId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newTask", task);
        console.log(`📩 Sent task to ${toUserId}`);
      }
    });

    // Example: New chat message
    socket.on("sendMessage", ({ toUserId, message }) => {
      const receiverSocketId = activeUsers.get(toUserId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", message);
      }
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
      for (const [userId, sockId] of activeUsers.entries()) {
        if (sockId === socket.id) {
          activeUsers.delete(userId);
          break;
        }
      }
    });
  });
}
