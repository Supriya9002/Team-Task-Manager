import { Server } from "socket.io";

const socketHandler = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("🔌 Client connected:", socket.id);

    socket.on("message", (data) => {
      console.log("📨 Message:", data);
      io.emit("message", data); // Broadcast to everyone
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
};

export default socketHandler;
