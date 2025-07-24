// server.js
const express = require("express");
const cors = require("cors");
const http = require("http"); 
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const rankingRoutes = require('./routes/rankingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const upload = require("./config/multerConfig");
const cookieParser = require("cookie-parser");
const socketSetup = require("./Socket/index"); // 
const startSubscriptionCron = require('./utils/subscriptionCron');

const passport = require('./config/passport');
const app = express();
const port = process.env.PORT || 8000;
require("dotenv").config();

const server = http.createServer(app);

// Start cron jobs
startSubscriptionCron();

const corsOptions = {
  origin: "https://xephra.net",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allows cookies to be sent
};
app.use(cors(corsOptions));

// ✅ Handle preflight requests explicitly
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://xephra.net");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});


// Middleware
app.use(cookieParser());
app.use(express.json());



app.use(passport.initialize());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));



// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use('/rank', rankingRoutes);
app.use("/payments", paymentRoutes);

// Connect to MongoDB
connectDB();

// Sample route
app.get("/", (req, res) => {
  res.send("Game Events API");
});

// Setup Socket.io
socketSetup(server);

// Start server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
