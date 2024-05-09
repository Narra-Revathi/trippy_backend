const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//env config
dotenv.config();

//router import
const userRoutes = require('./routes/userRoutes');

const blogRoutes = require('./routes/blogRoutes');

//rest objecct
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//mongodb connection
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
const backendurl="https://fascinating-klepon-a6b34e.netlify.app/";
connectDB(); // Call the function to connect to MongoDB

//routes
app.use(`${backendurl}/api/v1/user`, userRoutes);
app.use(`${backendurl}/api/v1/blog`, blogRoutes);

// Port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan
      .white
  );
});
