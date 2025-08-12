const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { createServer } = require("http");
const { Server } = require("socket.io");

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Online Examination Portal API" });
});

// Import routes
app.use("/api/auth", require("./routes/authRoutes"));
// app.use('/api/questions', require('./routes/questionRoutes'));
// app.use('/api/exams', require('./routes/examRoutes'));
// app.use('/api/admin', require('./routes/adminRoutes'));


// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join exam room
  socket.on("join-exam", (examId) => {
    socket.join(examId);
    console.log(`User ${socket.id} joined exam ${examId}`);
  });

  // Handle proctoring events
  socket.on("proctoring-alert", (data) => {
    socket.to(data.examId).emit("proctoring-violation", data);
  });

  // Handle exam submission
  socket.on("submit-exam", (data) => {
    socket.to(data.examId).emit("exam-submitted", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
