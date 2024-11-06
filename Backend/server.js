const express = require("express");
const connectDB = require("./db/db")
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const indexRoute = require('./routes/indexRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

// config the dotenv file
dotenv.config({ path: "./config/.env" });

// Connect to database
connectDB()

const app = express();

// Middleware
app.use(
    cors({
      origin: "https://travel-website-u4md.vercel.app",
      credentials: true // enable set cookie
    })
  );

//  parse JSON data in request
app.use(bodyParser.json());

// Parse cookies in requests
app.use(cookieParser());

// Simple route to check if backend is working
app.get('/hello', (req, res) => {
    res.send('Hello World! The backend is running.');
  });

// Error Handling Middleware
app.use(errorHandler);

app.use('/', indexRoute);  // main route

// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT , () => console.log(`Server running on port ${PORT}`))