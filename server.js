const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Environment configuration
dotenv.config();

// Router imports
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

// Express app initialization
const app = express();

// Middleware setup
app.use(cors({
  origin: 'https://main--curious-cendol-88871b.netlify.app', // Allow your frontend URL
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(morgan("dev"));

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://revathinarra9010:revathi123@cluster1.ithabpo.mongodb.net/?retryWrites=true&w=majority&appName=cluster1`);
    console.log(
      `Connected to Mongodb Database ${mongoose.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(`MONGO Connect Error ${error}`.bgRed.white);
  }
};

connectDB(); 
// Route registration
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

// Port configuration
const PORT = process.env.PORT || 8080;

// Server listening
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE || 'production'} mode on port ${PORT}`.bgCyan.white
  );
});
