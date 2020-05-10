const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const verify = require("./routes/verify");
const cors = require("cors");

dotenv.config();

// Connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },

  () => console.log("connected to db")
);

// Middleware
app.use(express.json());
app.use(cors());

// Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/post", postRoute);
app.use("/api/verify", verify);

app.listen(5000, () => console.log("Server Running"));
