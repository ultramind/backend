import express from "express";
import mongoose from "mongoose";
import userRoutes from "./Routes/usersRoutes";
import blogRoutes from "./Routes/blogRoutes";

const app = express();

// middleware
app.use(express.json());
app.use("/api/user/", userRoutes);
app.use("/api/blog", blogRoutes)

// mongoDB connection
mongoose
  .connect(
    "mongodb+srv://admin:JcPDLKkZ57A1uFSa@cluster0.7epkx.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("Database connected and server running on port 5000"))
  .catch((err) => console.log(err));
