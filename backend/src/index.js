import dotenv from "dotenv";
import express from "express";
import authRoutes from "../routes/auth.route.js";
import messageRoutes from "../routes/message.route.js";
import { dbConnect } from "../lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "../lib/socket.js";
import path from "path";

dotenv.config();

const port = process.env.PORT || 4001;
const __dirname = path.resolve();

// Middleware
app.use(express.json({ limit: "10mb" })); // Set JSON payload limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: "https://chatpal-w16v.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);

app.get("/api/v1", (req, res) => {
  res.send("This is the first Routes");
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/", "dist", "index.html"));
  });
}
// Start the server
server.listen(port, () => {
  console.log("Server is running on the port " + port);
  dbConnect();
});
