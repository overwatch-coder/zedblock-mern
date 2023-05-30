//import and enable .env values
import dotenv from "dotenv";
dotenv.config();

//import dependences
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

//custom imports
import userRoutes from "./routes/users.routes.js";
import todoRoutes from "./routes/todos.routes.js";
import connectDB from "./config/db.js";

//initialize express app
const app = express();

//add middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());

// Set the appropriate headers for CORS
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'https://zedblock-mern.vercel.app'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//connect to db
connectDB();

//add todo api routes
app.use('/api/auth/todos', todoRoutes);
app.use('/api/auth', userRoutes);
app.use('*', (req, res) => {
    res.redirect('/');
})

//listen to a specific port when database is connected
mongoose.connection.on('connected', () => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => console.log(`db connected and backend started and running on PORT ${port}`));
});